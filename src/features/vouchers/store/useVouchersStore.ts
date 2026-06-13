import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletStore } from "../../wallet/store/useWalletStore";

export interface Voucher {
  id: string;
  code: string;
  title: string;
  faceValue: number; // in pence
  purchaseDate: string;
}

interface VouchersState {
  vouchers: Voucher[];
  pointsBalance: number;
  error: string | null;
  isHydrated: boolean;
  purchaseVoucher: (title: string, faceValueInPence: number) => boolean;
  redeemPoints: () => boolean;
  clearError: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useVouchersStore = create<VouchersState>()(
  persist(
    (set, get) => ({
      vouchers: [],
      pointsBalance: 0,
      error: null,
      isHydrated: false,

      purchaseVoucher: (title: string, faceValueInPence: number) => {
        const walletBalance = useWalletStore.getState().balance;

        if (walletBalance < faceValueInPence) {
          set({
            error: "Insufficient wallet funds for this voucher purchase.",
          });
          return false;
        }

        const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let randomPart = "";
        for (let i = 0; i < 4; i++) {
          randomPart += characters.charAt(
            Math.floor(Math.random() * characters.length),
          );
        }
        const generatedCode = `VCHX-${randomPart}`;

        useWalletStore
          .getState()
          .executeTransaction(
            faceValueInPence,
            `Purchased ${title} Voucher`,
            "debit",
          );

        // Calculate earned points rewards (1 point per whole pound spent)
        const purchaseAmountInPounds = Math.floor(faceValueInPence / 100);
        const pointsEarned = purchaseAmountInPounds;

        const newVoucher: Voucher = {
          id: `vch-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          code: generatedCode,
          title,
          faceValue: faceValueInPence,
          purchaseDate: new Date().toISOString(),
        };

        set((state) => ({
          vouchers: [newVoucher, ...state.vouchers],
          pointsBalance: state.pointsBalance + pointsEarned,
          error: null,
        }));

        return true;
      },

      clearError: () => {
        set({ error: null });
      },

      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated });
      },
      redeemPoints: () => {
        const currentPoints = get().pointsBalance;

        if (currentPoints < 100) {
          set({ error: "You need at least 100 points to redeem." });
          return false;
        }

        // Calculate the maximum multiple of 100 available to redeem
        const pointsToRedeem = Math.floor(currentPoints / 100) * 100;

        // 100 points = £1.00 (100 pence). Therefore, 1 point = 1 pence credit.
        const creditAmountInPence = pointsToRedeem;

        useWalletStore
          .getState()
          .executeTransaction(
            creditAmountInPence,
            "Loyalty Points Redemption",
            "credit",
          );

        set((state) => ({
          pointsBalance: state.pointsBalance - pointsToRedeem,
          error: null,
        }));

        return true;
      },
    }),
    {
      name: "smart-wallet-vouchers",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        vouchers: state.vouchers,
        pointsBalance: state.pointsBalance,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true);
      },
    },
  ),
);
