import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { formatCurrencyFromPence } from "@/utils/formatCurrency";

const PRESET_VOUCHERS = [
  { id: "p1", title: "£10 Digital Voucher", value: 1000 },
  { id: "p2", title: "£25 Digital Voucher", value: 2500 },
  { id: "p3", title: "£50 Digital Voucher", value: 5000 },
  { id: "p4", title: "£100 Digital Voucher", value: 10000 },
];

type VoucherPresetGridProps = {
  onPurchase: (title: string, valueInPence: number) => void;
};

export default function VoucherPresetGrid({
  onPurchase,
}: VoucherPresetGridProps) {
  return (
    <View style={styles.gridContainer}>
      {PRESET_VOUCHERS.map((preset) => (
        <Pressable
          key={preset.id}
          style={({ pressed }) => [
            styles.presetCard,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onPurchase(preset.title, preset.value)}
        >
          <View style={styles.presetIconWrap}>
            <Ionicons name="gift-outline" size={24} color="#0F766E" />
          </View>
          <Text style={styles.presetCost}>
            {formatCurrencyFromPence(preset.value)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  presetCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: "48%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  presetIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0FDFA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  presetCost: { fontSize: 18, fontWeight: "800", color: "#0F172A" },
  buttonPressed: { opacity: 0.75 },
});
