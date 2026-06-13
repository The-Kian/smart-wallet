import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { formatCurrencyFromPence } from "@/utils/formatCurrency";

interface LoyaltyRewardsCardProps {
  pointsBalance: number;
  onRedeem: () => void;
}

export default function LoyaltyRewardsCard({
  pointsBalance,
  onRedeem,
}: LoyaltyRewardsCardProps) {
  return (
    <View style={styles.rewardsCard}>
      <View style={styles.rewardsInfo}>
        <Text style={styles.rewardsLabel}>Loyalty Points</Text>
        <Text style={styles.rewardsValue}>{pointsBalance}</Text>
        <Text style={styles.rewardsHint}>
          100 pts = {formatCurrencyFromPence(100)}
        </Text>
      </View>
      <Pressable
        onPress={onRedeem}
        disabled={pointsBalance < 100}
        style={({ pressed }) => [
          styles.redeemButton,
          pointsBalance < 100 && styles.redeemButtonDisabled,
          pressed && pointsBalance >= 100 && styles.buttonPressed,
        ]}
      >
        <Text style={styles.redeemButtonText}>Claim Cash</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rewardsCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  rewardsInfo: { flex: 1 },
  rewardsLabel: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  rewardsValue: {
    color: "#F8FAFC",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 4,
  },
  rewardsHint: { 
    color: "#94A3B8", 
    fontSize: 13, 
    marginTop: 4 
  },
  redeemButton: {
    backgroundColor: "#EAB308",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  redeemButtonDisabled: { 
    backgroundColor: "#475569" 
  },
  redeemButtonText: { 
    color: "#0F172A", 
    fontSize: 14, 
    fontWeight: "700" 
  },
  buttonPressed: { 
    opacity: 0.75 
  },
});