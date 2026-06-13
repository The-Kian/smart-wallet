import Ionicons from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import EmptyStateCard from "@/components/ui/EmptyStateCard";
import { type Pot } from "@/features/pots/store/usePotsStore";
import { formatCurrencyFromPence } from "@/utils/formatCurrency";

type PotsListProps = {
  pots: Pot[];
  onSelectPot: (potId: string) => void;
};

export default function PotsList({ pots, onSelectPot }: PotsListProps) {
  if (pots.length === 0) {
    return <EmptyStateCard message="No pots yet." />;
  }

  return (
    <View>
      {pots.map((pot) => (
        <Pressable
          key={pot.id}
          onPress={() => onSelectPot(pot.id)}
          style={styles.potCard}
        >
          <View style={styles.potIconContainer}>
            <Ionicons name="leaf" size={20} color="#0F766E" />
          </View>
          <Text style={styles.potName}>{pot.name}</Text>
          <Text style={styles.potBalance}>
            {formatCurrencyFromPence(pot.balance)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
  potIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0FDFA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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
