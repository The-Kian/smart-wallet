import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

import { usePotsStore } from "../../store/usePotsStore";
import {
    digitsToPence,
    formatDigitsAsCurrencyInput,
    toDigitsOnly,
} from "../../utils/currencyInput";

import { useWalletStore } from "@/features/wallet/store/useWalletStore";
import styles from "./ManagePotModal.styles";

const ManagePotModal = ({
  potId,
  onClose,
}: {
  potId: string;
  onClose: () => void;
}) => {
  const pot = usePotsStore((state) =>
    state.pots.find((currentPot) => currentPot.id === potId),
  );
  const renamePot = usePotsStore((state) => state.renamePot);
  const transferToPot = usePotsStore((state) => state.transferToPot);
  const transferToWallet = usePotsStore((state) => state.transferToWallet);
  const deletePot = usePotsStore((state) => state.deletePot);
  const mainBalance = useWalletStore((state) => state.balance);
  const [name, setName] = useState(pot?.name ?? "");
  const [amountDigits, setAmountDigits] = useState("");
  const [error, setError] = useState<string | null>(null);

  const amountInput = formatDigitsAsCurrencyInput(amountDigits);

  const parseAmount = () => {
    const amountInPence = digitsToPence(amountDigits);

    if (!Number.isFinite(amountInPence) || amountInPence <= 0) {
      setError("Amount must be a positive number");
      return null;
    }

    return amountInPence;
  };

  const handleRenamePot = () => {
    if (!pot) {
      setError("Pot not found");
      return;
    }

    if (!name.trim()) {
      setError("Pot name is required");
      return;
    }

    const success = renamePot(pot.id, name.trim());
    if (success) {
      setError(null);
      onClose();
    } else {
      setError(usePotsStore.getState().error || "Failed to rename pot");
    }
  };

  const handleWithdrawFromPot = () => {
    if (!pot) {
      setError("Pot not found");
      return;
    }

    const amount = parseAmount();

    if (!amount) {
      return;
    }

    if (amount > pot.balance) {
      setError("Amount exceeds pot balance");
      return;
    }

    const success = transferToWallet(pot.id, amount);
    if (success) {
      setAmountDigits("");
      setError(null);
      onClose();
    } else {
      setError(usePotsStore.getState().error || "Failed to withdraw from pot");
    }
  };

  const handleDepositToPot = () => {
    if (!pot) {
      setError("Pot not found");
      return;
    }

    const amount = parseAmount();

    if (!amount) {
      return;
    }

    if (amount > mainBalance) {
      setError("Amount exceeds main wallet balance");
      return;
    }

    const success = transferToPot(pot.id, amount);
    if (success) {
      setAmountDigits("");
      setError(null);
      onClose();
    } else {
      setError(usePotsStore.getState().error || "Failed to deposit to pot");
    }
  };

  const handleDeletePot = () => {
    if (!pot) {
      setError("Pot not found");
      return;
    }

    const success = deletePot(pot.id);
    if (success) {
      setError(null);
      onClose();
    } else {
      setError(usePotsStore.getState().error || "Failed to delete pot");
    }
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
      visible={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.backdrop}>
          <View style={styles.card}>
            <Text style={styles.title}>Manage Pot</Text>
            <Text style={styles.subtitle}>
              Update the name, deposit or withdraw funds, or delete this pot.
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
              <Text style={styles.label}>Amount</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={(value) => setAmountDigits(toDigitsOnly(value))}
                placeholder="Amount"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={amountInput}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.verticalActionStack}>
              <View style={styles.actionRow}>
                <Pressable
                  onPress={handleDepositToPot}
                  style={[styles.primaryButton, styles.depositButton]}
                >
                  <Text style={styles.primaryButtonText}>Deposit</Text>
                </Pressable>
                <Pressable
                  onPress={handleWithdrawFromPot}
                  style={[styles.primaryButton, styles.withdrawButton]}
                >
                  <Text style={styles.primaryButtonText}>Withdraw</Text>
                </Pressable>
              </View>

              <View style={styles.actionRow}>
                <Pressable
                  onPress={handleRenamePot}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryButtonText}>Rename Pot</Text>
                </Pressable>
                <Pressable
                  onPress={handleDeletePot}
                  style={[styles.secondaryButton, styles.deleteButton]}
                >
                  <Text style={styles.deleteButtonText}>Delete Pot</Text>
                </Pressable>
              </View>

              <Pressable
                onPress={onClose}
                style={styles.cancelLink}
                testID="close-button"
              >
                <Text style={styles.cancelLinkText}>Close Options</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ManagePotModal;
