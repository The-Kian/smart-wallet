import { StyleSheet, Text, View } from "react-native";

type BalanceSummaryCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export default function BalanceSummaryCard({
  label,
  value,
  hint,
}: BalanceSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
  },
  hint: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
});
