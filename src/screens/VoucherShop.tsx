import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BalanceSummaryCard from "@/components/ui/BalanceSummaryCard";
import ScreenHeader from "@/components/ui/ScreenHeader";
import VoucherList from "@/features/vouchers/components/VoucherList";
import VoucherPresetGrid from "@/features/vouchers/components/VoucherPresetGrid";
import { useVouchersStore } from "@/features/vouchers/store/useVouchersStore";
import { useWalletStore } from "@/features/wallet/store/useWalletStore";
import { confirm } from "@/utils/confirm";
import { formatCurrencyFromPence } from "@/utils/formatCurrency";

export default function Shop() {
  const { vouchers, error, purchaseVoucher, clearError } = useVouchersStore();
  const walletBalance = useWalletStore((state) => state.balance);

  const handlePurchase = (title: string, valueInPence: number) => {
    confirm({
      title: "Confirm Purchase",
      message: `Buy ${title} for ${formatCurrencyFromPence(valueInPence)}?`,
      confirmLabel: "Purchase",
      onConfirm: () => {
        const success = purchaseVoucher(title, valueInPence);
        if (success) {
          confirm({
            title: "Success",
            message: "Voucher purchased and added to your wallet.",
            confirmLabel: "OK",
            onConfirm: () => {},
          });
        }
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader
          title="Shop"
          description="Purchase vouchers directly using your wallet balance."
        />

        <BalanceSummaryCard
          label="Available Wallet Balance"
          value={formatCurrencyFromPence(walletBalance)}
        />

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorDismiss} onPress={clearError}>
              Dismiss
            </Text>
          </View>
        )}

        <Text style={styles.sectionHeading}>Available Vouchers</Text>
        <VoucherPresetGrid onPurchase={handlePurchase} />

        <Text style={styles.sectionHeading}>My Vouchers</Text>
        <VoucherList vouchers={vouchers} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16 },
  errorContainer: {
    backgroundColor: "#FEF2F2",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    borderColor: "#FCA5A5",
    borderWidth: 1,
  },
  errorText: { color: "#DC2626", fontWeight: "500", flex: 1 },
  errorDismiss: { color: "#991B1B", fontWeight: "700", marginLeft: 8 },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 12,
    marginBottom: 12,
  },
});
