import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, View } from "react-native";
import {
  Transaction,
  useWalletStore,
} from "../features/wallet/store/useWalletStore";

export default function WalletScreen() {
  const { balance, transactions, error, clearError } = useWalletStore();

  const formatCurrency = (pence: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(pence / 100);
  };

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const isCredit = item.type === "credit";
    const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    return (
      <View style={styles.transactionRow}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          <Text style={styles.transactionDate}>
            {formattedDate} • Bal: {formatCurrency(item.runningBalance)}
          </Text>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            { color: isCredit ? "#10B981" : "#111827" },
          ]}
        >
          {isCredit ? "+" : "-"}
          {formatCurrency(item.amount)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
      </View>

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorDismiss} onPress={clearError}>
            Dismiss
          </Text>
        </View>
      )}

      <View style={styles.ledgerContainer}>
        <Text style={styles.ledgerTitle}>Recent Activity</Text>
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No transactions yet.</Text>
          </View>
        ) : (
          <FlashList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  balanceCard: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -1,
  },
  errorBanner: {
    backgroundColor: "#FEF2F2",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#FCA5A5",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
  },
  errorDismiss: {
    color: "#991B1B",
    fontSize: 14,
    fontWeight: "700",
  },
  ledgerContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 8,
  },
  ledgerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  listContent: {
    paddingBottom: 20,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
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
  emptyState: {
    padding: 32,
    alignItems: "center",
  },
  emptyStateText: {
    color: "#9CA3AF",
    fontSize: 15,
  },
});
