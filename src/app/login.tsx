import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AuthActionCard from "@/features/auth/components/AuthActionCard";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import { fetchGoogleUserProfile } from "../services/googleAuth";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

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
        <AuthActionCard
          onGoogleSignIn={handleRealGoogleSignIn}
          onSandboxSignIn={handleMockSignIn}
        />
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
});
