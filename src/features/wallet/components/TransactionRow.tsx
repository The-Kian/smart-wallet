import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import { Transaction } from "@/features/wallet/store/useWalletStore";
import { formatCurrencyFromPence } from "@/utils/formatCurrency";

type TransactionRowProps = {
  item: Transaction;
};

export default function TransactionRow({ item }: TransactionRowProps) {
  const isCredit = item.type === "credit";
  const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  return (
    <View style={styles.transactionRow}>
      <View style={[styles.avatarIcon, { backgroundColor: isCredit ? "#ECFDF5" : "#F7FEE7" }]}>
        <Ionicons
          name={isCredit ? "arrow-down-outline" : "arrow-up-outline"}
          size={18}
          color={isCredit ? "#059669" : "#4D7C0F"}
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>
          {formattedDate} • Bal: {formatCurrencyFromPence(item.runningBalance)}
        </Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: isCredit ? "#10B981" : "#111827" },
        ]}
      >
        {isCredit ? "+" : "-"}
        {formatCurrencyFromPence(item.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  avatarIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
    paddingRight: 16,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: "#6B7280",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});
