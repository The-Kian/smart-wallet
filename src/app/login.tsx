import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginScreen() {
  const { signIn } = useAuthStore();

  const handleRealGoogleSignIn = async () => {
    try {
      // TODO: Place your operational logic for Firebase / Google Auth here
      // const response = await triggerGoogleAuth();
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not complete Google Auth login.",
      );
    }
  };

  const handleMockSignIn = () => {
    // Fallback allows instant cross-platform review on web/simulators
    signIn({
      name: "Kian Popat",
      email: "kian.popat@example.com",
      avatarUrl:
        "https://gratisography.com/wp-content/uploads/2025/05/gratisography-moon-robot-1035x780.jpg",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandingSection}>
        <Text style={styles.logo}>aslan.</Text>
        <Text style={styles.subtitle}>Smart Wallet Application</Text>
      </View>

      <View style={styles.actionSection}>
        <View style={styles.card}>
          <Pressable
            onPress={handleRealGoogleSignIn}
            style={({ pressed }) => [
              styles.primaryAuthButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryAuthButtonText}>
              Sign In with Google
            </Text>
          </Pressable>

          <Pressable
            onPress={handleMockSignIn}
            style={({ pressed }) => [
              styles.mockButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.mockButtonText}>
              Bypass with Sandbox Profile (Simulator / Web)
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "space-between",
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  brandingSection: {
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1,
    color: "#111111",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  actionSection: {
    gap: 16,
  },
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
