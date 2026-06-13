import { StyleSheet, Text, View } from "react-native";

import EmptyStateCard from "@/components/ui/EmptyStateCard";
import { type Voucher } from "@/features/vouchers/store/useVouchersStore";
import { formatCurrencyFromPence } from "@/utils/formatCurrency";

type VoucherListProps = {
  vouchers: Voucher[];
};

export default function VoucherList({ vouchers }: VoucherListProps) {
  if (vouchers.length === 0) {
    return <EmptyStateCard message="No vouchers purchased yet." />;
  }

  return (
    <View>
      {vouchers.map((item) => (
        <View key={item.id} style={styles.voucherRowCard}>
          <View style={styles.voucherIdentity}>
            <Text style={styles.voucherRowTitle}>{item.title}</Text>
            <Text style={styles.voucherRowDate}>
              {new Date(item.purchaseDate).toLocaleDateString("en-GB")}
            </Text>
            <View style={styles.codeBadge}>
              <Text style={styles.codeText}>{item.code}</Text>
            </View>
          </View>
          <Text style={styles.voucherValueDisplay}>
            {formatCurrencyFromPence(item.faceValue)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  voucherRowCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDF2F7",
  },
  voucherIdentity: { flex: 1 },
  voucherRowTitle: { fontSize: 16, fontWeight: "700", color: "#1A202C" },
  voucherRowDate: { fontSize: 12, color: "#718096", marginTop: 2 },
  codeBadge: {
    backgroundColor: "#F1F5F9",
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    letterSpacing: 1,
  },
  voucherValueDisplay: { fontSize: 18, fontWeight: "800", color: "#0F766E" },
});
