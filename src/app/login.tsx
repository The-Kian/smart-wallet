// app/login.tsx
import { Alert, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
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
        <Title style={styles.logo}>aslan.</Title>
        <Paragraph style={styles.subtitle}>Smart Wallet Application</Paragraph>
      </View>

      <View style={styles.actionSection}>
        <Card mode="elevated" style={styles.card}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={handleRealGoogleSignIn}
              buttonColor="#4285F4"
              style={styles.primaryAuthButton}
              contentStyle={{ paddingVertical: 10 }}
            >
              Sign In with Google
            </Button>

            <Button
              mode="outlined"
              onPress={handleMockSignIn}
              style={styles.mockButton}
              textColor="#374151"
            >
              Bypass with Sandbox Profile (Simulator / Web)
            </Button>
          </Card.Content>
        </Card>
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
    borderRadius: 12,
    padding: 8,
  },
  primaryAuthButton: {
    borderRadius: 12,
    marginBottom: 12,
  },
  mockButton: {
    borderRadius: 12,
  },
});
