import { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { usePotsStore } from "../../store/usePotsStore";

import styles from "./AddPotModal.styles";
import { useWalletStore } from "@/features/wallet/store/useWalletStore";

const AddPotModal = ({ onClose }: { onClose: () => void }) => {
  const addPot = usePotsStore((state) => state.addPot);
  const mainBalance = useWalletStore((state) => state.balance); 
  const [name, setName] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreatePot = () => {
    const amount = Number(initialAmount);

    if (!name.trim()) {
      setError("Pot name is required");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    if(amount > mainBalance) {
      setError("Amount exceeds main wallet balance");
      return;
    }

    addPot({
      id: `pot-${Date.now()}`,
      name: name.trim(),
      balance: amount,
    });
    setError(null);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
      visible={true}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Create a new pot</Text>
          <Text style={styles.subtitle}>
            Set a name and starting amount for your savings goal.
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Pot name</Text>
            <TextInput
              onChangeText={setName}
              placeholder="Pot name"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={name}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Initial amount</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={setInitialAmount}
              placeholder="Initial amount in £12.34 format"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={initialAmount}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              style={styles.secondaryButton}
              testID="close-button"
            >
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleCreatePot} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Create Pot</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default AddPotModal;
