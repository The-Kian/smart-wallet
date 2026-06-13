import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  runningBalance: number;
  type: "credit" | "debit";
}

interface WalletState {
  balance: number; // In pence (e.g., 50000 = £500.00)
  transactions: Transaction[];
  isHydrated: boolean;
  executeTransaction: (
    amountInPence: number,
    description: string,
    type: "credit" | "debit",
  ) => boolean;
  error: string | null;
  clearError: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balance: 50000,
      transactions: [],
      error: null,
      isHydrated: false,

      executeTransaction: (
        amountInPence: number,
        description: string,
        type: "credit" | "debit",
      ) => {
        const { balance, transactions } = get();
        let newBalance: number;

        if (type === "debit") {
          if (balance < amountInPence) {
            set({ error: "Insufficient funds. Transaction declined." });
            return false;
          }
          newBalance = balance - amountInPence;
        } else if (type === "credit") {
          newBalance = balance + amountInPence;
        } else {
          return false;
        }

        const newTransaction: Transaction = {
          id: Crypto.randomUUID(),
          date: new Date().toISOString(),
          description,
          amount: amountInPence,
          runningBalance: newBalance,
          type,
        };

        set({
          balance: newBalance,
          transactions: [newTransaction, ...transactions],
          error: null,
        });

        return true;
      },

      clearError: () => set({ error: null }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: "smart-wallet-data",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        balance: state.balance,
        transactions: state.transactions,
      }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.setHydrated(true);
          }
        };
      },
    },
  ),
);
