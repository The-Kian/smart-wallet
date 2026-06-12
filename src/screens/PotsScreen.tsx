import { StyleSheet, Text, View } from "react-native";

import { usePotsStore } from "../features/pots/store/usePotsStore";
import { useWalletStore } from "../features/wallet/store/useWalletStore";

const formatCurrency = (pence: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);

export default function PotsScreen() {
  const walletBalance = useWalletStore((state) => state.balance);
  const pots = usePotsStore((state) => state.pots);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pots</Text>
        <Text style={styles.description}>
          Track your savings goals and stash money in dedicated pots.
        </Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Main wallet balance</Text>
        <Text style={styles.balanceValue}>{formatCurrency(walletBalance)}</Text>
        <Text style={styles.balanceHint}>
          Pot money is set aside separately from the main wallet.
        </Text>
      </View>

      <View style={styles.potsSection}>
        <Text style={styles.sectionTitle}>Your pots</Text>

        {pots.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No pots yet.</Text>
          </View>
        ) : (
          pots.map((pot) => (
            <View key={pot.id} style={styles.potCard}>
              <Text style={styles.potName}>{pot.name}</Text>
              <Text style={styles.potBalance}>
                {formatCurrency(pot.balance)}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },
  description: {
    marginTop: 8,
    color: "#475569",
    fontSize: 16,
    lineHeight: 23,
  },
  balanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceValue: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
  },
  balanceHint: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
  potsSection: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  emptyState: {
    paddingVertical: 28,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  emptyStateText: {
    color: "#94A3B8",
    fontSize: 15,
  },
  potCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  potName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    paddingRight: 16,
  },
  potBalance: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F766E",
  },
});
