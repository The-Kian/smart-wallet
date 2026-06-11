import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { fetchGoogleUserProfile } from "../services/googleAuth";
import { useAuthStore } from "../store/useAuthStore";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

const GOOGLE_CLIENT_ID =
  "118189943193-96r1cuehgkagl5l570kvn13tej7ahkt2.apps.googleusercontent.com";

export default function LoginScreen() {
  const { signIn } = useAuthStore();

  const [, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ["profile", "email"],
      redirectUri: AuthSession.makeRedirectUri(),
      responseType: AuthSession.ResponseType.Token,
      usePKCE: false,
    },
    discovery,
  );

  useEffect(() => {
    const handleTokenResponse = async (access_token: string) => {
      try {
        const userProfile = await fetchGoogleUserProfile(access_token);

        if (userProfile) {
          signIn(userProfile);
        } else {
          Alert.alert(
            "Authentication Failed",
            "Could not fetch user profile from Google.",
          );
        }
      } catch {
        Alert.alert(
          "Authentication Failed",
          "Could not complete Google Auth login.",
        );
      }
    };

    if (response?.type === "success") {
      const { access_token } = response.params;
      void handleTokenResponse(access_token);
    } else if (response?.type === "error") {
      Alert.alert(
        "Authentication Failed",
        response.params.error || "Could not complete Google Auth login.",
      );
    }
  }, [response, signIn]);

  const handleRealGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch {
      Alert.alert(
        "Authentication Failed",
        "Could not initiate Google Auth login.",
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
            accessibilityRole="button"
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
            accessibilityRole="button"
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
