import { Button, StyleSheet, Text, View } from "react-native";

import AddPotModal from "@/features/pots/components/AddPotModal";
import BalanceSummaryCard from "@/components/ui/BalanceSummaryCard";
import ScreenHeader from "@/components/ui/ScreenHeader";
import PotsList from "@/features/pots/components/PotsList";
import { useState } from "react";
import { usePotsStore } from "../features/pots/store/usePotsStore";
import { useWalletStore } from "../features/wallet/store/useWalletStore";
import ManagePotModal from "@/features/pots/components/ManagePotModal";
import { formatCurrencyFromPence } from "@/utils/formatCurrency";

export default function PotsScreen() {
  const walletBalance = useWalletStore((state) => state.balance);
  const pots = usePotsStore((state) => state.pots);
  const [isAddPotModalVisible, setIsAddPotModalVisible] = useState(false);
  const [isManagePotModalVisible, setIsManagePotModalVisible] = useState(false);
  const [selectedPot, setSelectedPot] = useState<string | null>(null);

  const handleSelectPot = (potId: string) => {
    setSelectedPot(potId);
    setIsManagePotModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Pots"
        description="Track your savings goals and stash money in dedicated pots."
      />

      <BalanceSummaryCard
        label="Main wallet balance"
        value={formatCurrencyFromPence(walletBalance)}
        hint="Pot money is set aside separately from the main wallet."
      />

      <View style={styles.potsSection}>
        <Text style={styles.sectionTitle}>Your pots</Text>
        <Button title="Add Pot" onPress={() => setIsAddPotModalVisible(true)} />
        {isAddPotModalVisible && (
          <AddPotModal onClose={() => setIsAddPotModalVisible(false)} />
        )}
        {isManagePotModalVisible && selectedPot && (
          <ManagePotModal
            potId={selectedPot}
            onClose={() => setIsManagePotModalVisible(false)}
          />
        )}

        <PotsList pots={pots} onSelectPot={handleSelectPot} />
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
  potsSection: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
});
