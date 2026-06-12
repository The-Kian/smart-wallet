import { Pressable, StyleSheet, Text, View } from "react-native";

type AuthActionCardProps = {
  onGoogleSignIn: () => void;
  onSandboxSignIn: () => void;
};

export default function AuthActionCard({
  onGoogleSignIn,
  onSandboxSignIn,
}: AuthActionCardProps) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onGoogleSignIn}
        accessibilityRole="button"
        style={({ pressed }) => [styles.primaryAuthButton, pressed && styles.buttonPressed]}
      >
        <Text style={styles.primaryAuthButtonText}>Sign In with Google</Text>
      </Pressable>

      <Pressable
        onPress={onSandboxSignIn}
        accessibilityRole="button"
        style={({ pressed }) => [styles.mockButton, pressed && styles.buttonPressed]}
      >
        <Text style={styles.mockButtonText}>
          Bypass with Sandbox Profile (Simulator / Web)
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
    borderRadius: 12,
    padding: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  primaryAuthButton: {
    backgroundColor: "#4285F4",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  mockButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  primaryAuthButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  mockButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
