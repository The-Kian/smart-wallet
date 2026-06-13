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
  isHydrated: boolean;
  addPot: (pot: Pot) => boolean;
  renamePot: (potId: string, name: string) => boolean;
  transferToPot: (potId: string, amountInPence: number) => boolean;
  transferToWallet: (potId: string, amountInPence: number) => boolean;
  deletePot: (potId: string) => boolean;
  clearError: () => void;
  setHydrated: (hydrated: boolean) => void;
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
      isHydrated: false,

      addPot: (pot) => {
        const trimmedName = pot.name.trim();

        if (!trimmedName) {
          set({ error: "Pot name is required." });
          return false;
        }

        const nameExists = get().pots.some(
          (p) => p.name.trim().toLowerCase() === trimmedName.toLowerCase(),
        );
        if (nameExists) {
          set({ error: "A pot with this name already exists." });
          return false;
        }

        const walletBalance = useWalletStore.getState().balance;
        if (walletBalance < pot.balance) {
          set({ error: insufficientFundsError });
          return false;
        }

        const transactionSuccess = useWalletStore
          .getState()
          .executeTransaction(
            pot.balance,
            `Transfer to ${trimmedName}`,
            "debit",
          );

        if (!transactionSuccess) {
          set({ error: insufficientFundsError });
          return false;
        }

        set((state) => ({
          pots: [...state.pots, { ...pot, name: trimmedName }],
          error: null,
        }));
        return true;
      },

      renamePot: (potId, name) => {
        const trimmedName = name.trim();
        if (!trimmedName) {
          set({ error: "Pot name is required." });
          return false;
        }

        const pot = get().pots.find((currentPot) => currentPot.id === potId);
        if (!pot) {
          set({ error: potNotFoundError });
          return false;
        }

        const nameExists = get().pots.some(
          (p) =>
            p.id !== potId &&
            p.name.trim().toLowerCase() === trimmedName.toLowerCase(),
        );
        if (nameExists) {
          set({ error: "A pot with this name already exists." });
          return false;
        }

        set((state) => ({
          pots: state.pots.map((currentPot) =>
            currentPot.id === potId
              ? { ...currentPot, name: trimmedName }
              : currentPot,
          ),
          error: null,
        }));
        return true;
      },

      transferToPot: (potId, amountInPence) => {
        const pot = get().pots.find((currentPot) => currentPot.id === potId);
        if (!pot) {
          set({ error: potNotFoundError });
          return false;
        }

        const walletBalance = useWalletStore.getState().balance;
        if (walletBalance < amountInPence) {
          set({ error: insufficientWalletFundsError });
          return false;
        }

        const transactionSuccess = useWalletStore
          .getState()
          .executeTransaction(
            amountInPence,
            `Transfer to ${pot.name}`,
            "debit",
          );

        if (!transactionSuccess) {
          set({ error: insufficientWalletFundsError });
          return false;
        }

        set((state) => ({
          pots: state.pots.map((currentPot) =>
            currentPot.id === potId
              ? { ...currentPot, balance: currentPot.balance + amountInPence }
              : currentPot,
          ),
          error: null,
        }));
        return true;
      },

      transferToWallet: (potId, amountInPence) => {
        const pot = get().pots.find((currentPot) => currentPot.id === potId);
        if (!pot) {
          set({ error: potNotFoundError });
          return false;
        }

        if (pot.balance < amountInPence) {
          set({ error: insufficientPotFundsError });
          return false;
        }

        const transactionSuccess = useWalletStore
          .getState()
          .executeTransaction(
            amountInPence,
            `Transfer from ${pot.name}`,
            "credit",
          );

        if (!transactionSuccess) {
          set({ error: "Failed to execute transaction in wallet." });
          return false;
        }

        set((state) => ({
          pots: state.pots.map((currentPot) =>
            currentPot.id === potId
              ? { ...currentPot, balance: currentPot.balance - amountInPence }
              : currentPot,
          ),
          error: null,
        }));
        return true;
      },

      deletePot: (potId) => {
        const pot = get().pots.find((currentPot) => currentPot.id === potId);
        if (!pot) {
          set({ error: potNotFoundError });
          return false;
        }

        if (pot.balance > 0) {
          const transactionSuccess = useWalletStore
            .getState()
            .executeTransaction(pot.balance, `Delete ${pot.name}`, "credit");
          if (!transactionSuccess) {
            set({ error: "Failed to transfer pot balance back to wallet." });
            return false;
          }
        }

        set((state) => ({
          pots: state.pots.filter((currentPot) => currentPot.id !== potId),
          error: null,
        }));
        return true;
      },

      clearError: () => set({ error: null }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: "smart-wallet-pots",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        pots: state.pots,
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
