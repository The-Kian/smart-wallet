import EmptyStateCard from "@/components/ui/EmptyStateCard";
import TransactionRow from "@/features/wallet/components/TransactionRow";
import { formatCurrencyFromPence } from "@/utils/formatCurrency";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useWalletStore } from "../features/wallet/store/useWalletStore";

export default function WalletScreen() {
  const { balance, transactions, error, clearError } = useWalletStore();

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceValue}>
          {formatCurrencyFromPence(balance)}
        </Text>
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
          <View style={styles.emptyStateWrap}>
            <EmptyStateCard message="No transactions yet." />
          </View>
        ) : (
          <FlatList
            data={transactions}
            renderItem={({ item }) => <TransactionRow item={item} />}
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
  emptyStateWrap: {
    padding: 20,
  },
});
