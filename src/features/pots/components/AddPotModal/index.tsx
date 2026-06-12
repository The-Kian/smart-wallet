import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View } from "react-native";

import { usePotsStore } from "../../store/usePotsStore";
import {
  digitsToPence,
  formatDigitsAsCurrencyInput,
  toDigitsOnly,
} from "../../utils/currencyInput";

import { useWalletStore } from "@/features/wallet/store/useWalletStore";
import styles from "./AddPotModal.styles";

const AddPotModal = ({ onClose }: { onClose: () => void }) => {
  const addPot = usePotsStore((state) => state.addPot);
  const mainBalance = useWalletStore((state) => state.balance);
  const [name, setName] = useState("");
  const [amountDigits, setAmountDigits] = useState("");
  const [error, setError] = useState<string | null>(null);

  const amountInput = formatDigitsAsCurrencyInput(amountDigits);

  const handleCreatePot = () => {
    const amountInPence = digitsToPence(amountDigits);

    if (!name.trim()) {
      setError("Pot name is required");
      return;
    }

    if (!Number.isFinite(amountInPence) || amountInPence <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    if (amountInPence > mainBalance) {
      setError("Amount exceeds main wallet balance");
      return;
    }

    addPot({
      id: `pot-${Date.now()}`,
      name: name.trim(),
      balance: amountInPence,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
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
              onChangeText={(value) => setAmountDigits(toDigitsOnly(value))}
              placeholder="Initial amount"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={amountInput}
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
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddPotModal;
