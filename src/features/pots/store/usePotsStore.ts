import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { useWalletStore } from "../../wallet/store/useWalletStore";

export interface Pot {
  id: string;
  name: string;
  balance: number;
}

interface PotsState {
  pots: Pot[];
  error: string | null;
  addPot: (pot: Pot) => void;
  renamePot: (potId: string, name: string) => void;
  transferToPot: (potId: string, amountInPence: number) => void;
  transferToWallet: (potId: string, amountInPence: number) => void;
  deletePot: (potId: string) => void;
  clearError: () => void;
}

const insufficientFundsError = "Insufficient funds to create this pot.";
const insufficientWalletFundsError = "Insufficient funds in main wallet.";
const insufficientPotFundsError = "Insufficient funds in this pot.";
const potNotFoundError = "Pot not found.";

export const usePotsStore = create<PotsState>()(
  persist(
    (set, get) => ({
      pots: [],
      error: null,

      addPot: (pot) => {
        const walletBalance = useWalletStore.getState().balance;

        if (walletBalance < pot.balance) {
          set({ error: insufficientFundsError });
          return;
        }

        useWalletStore
          .getState()
          .executeTransaction(pot.balance, `Transfer to ${pot.name}`, "debit");

        set((state) => ({
          pots: [...state.pots, pot],
          error: null,
        }));
      },

      renamePot: (potId, name) => {
        const trimmedName = name.trim();
        const pot = get().pots.find((currentPot) => currentPot.id === potId);

        if (!pot) {
          set({ error: potNotFoundError });
          return;
        }

        if (!trimmedName) {
          set({ error: "Pot name is required." });
          return;
        }

        set((state) => ({
          pots: state.pots.map((currentPot) =>
            currentPot.id === potId
              ? { ...currentPot, name: trimmedName }
              : currentPot,
          ),
          error: null,
        }));
      },

      transferToPot: (potId, amountInPence) => {
        const pot = get().pots.find((currentPot) => currentPot.id === potId);
        const walletBalance = useWalletStore.getState().balance;

        if (!pot) {
          set({ error: potNotFoundError });
          return;
        }

        if (walletBalance < amountInPence) {
          set({ error: insufficientWalletFundsError });
          return;
        }

        useWalletStore
          .getState()
          .executeTransaction(
            amountInPence,
            `Transfer to ${pot.name}`,
            "debit",
          );

        set((state) => ({
          pots: state.pots.map((currentPot) =>
            currentPot.id === potId
              ? { ...currentPot, balance: currentPot.balance + amountInPence }
              : currentPot,
          ),
          error: null,
        }));
      },

      transferToWallet: (potId, amountInPence) => {
        const pot = get().pots.find((currentPot) => currentPot.id === potId);

        if (!pot) {
          set({ error: potNotFoundError });
          return;
        }

        if (pot.balance < amountInPence) {
          set({ error: insufficientPotFundsError });
          return;
        }

        useWalletStore
          .getState()
          .executeTransaction(
            amountInPence,
            `Transfer from ${pot.name}`,
            "credit",
          );

        set((state) => ({
          pots: state.pots.map((currentPot) =>
            currentPot.id === potId
              ? { ...currentPot, balance: currentPot.balance - amountInPence }
              : currentPot,
          ),
          error: null,
        }));
      },

      deletePot: (potId) => {
        const pot = get().pots.find((currentPot) => currentPot.id === potId);

        if (!pot) {
          set({ error: potNotFoundError });
          return;
        }

        if (pot.balance > 0) {
          useWalletStore
            .getState()
            .executeTransaction(pot.balance, `Delete ${pot.name}`, "credit");
        }

        set((state) => ({
          pots: state.pots.filter((currentPot) => currentPot.id !== potId),
          error: null,
        }));
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "smart-wallet-pots",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
