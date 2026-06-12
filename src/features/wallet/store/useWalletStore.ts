import AsyncStorage from "@react-native-async-storage/async-storage";
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
  executeTransaction: (
    amountInPence: number,
    description: string,
    type: "credit" | "debit",
  ) => void;
  error: string | null;
  clearError: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balance: 50000,
      transactions: [],
      error: null,

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
            return;
          }
          newBalance = balance - amountInPence;
        } else if (type === "credit") {
          newBalance = balance + amountInPence;
        } else {
          return;
        }

        const newTransaction: Transaction = {
          id: Math.random().toString(36).substring(2, 9),
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
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "smart-wallet-data",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
