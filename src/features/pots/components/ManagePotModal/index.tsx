import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

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

    renamePot(pot.id, name.trim());
    setError(null);
    onClose();
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

    transferToWallet(pot.id, amount);
    setAmountDigits("");
    setError(null);
    onClose();
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

    transferToPot(pot.id, amount);
    setAmountDigits("");
    setError(null);
    onClose();
  };

  const handleDeletePot = () => {
    if (!pot) {
      setError("Pot not found");
      return;
    }

    deletePot(pot.id);
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

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              style={styles.secondaryButton}
              testID="close-button"
            >
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleRenamePot} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Rename Pot</Text>
            </Pressable>
            <Pressable
              onPress={handleDepositToPot}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Deposit</Text>
            </Pressable>
            <Pressable
              onPress={handleWithdrawFromPot}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Withdraw</Text>
            </Pressable>
            <Pressable onPress={handleDeletePot} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Delete Pot</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ManagePotModal;
