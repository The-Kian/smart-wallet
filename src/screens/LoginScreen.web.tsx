import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import AuthActionCard from "@/features/auth/components/AuthActionCard";
import { useAuthStore, UserProfile } from "../features/auth/store/useAuthStore";

// Required for web popup redirects
WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID =
  "118189943193-96r1cuehgkagl5l570kvn13tej7ahkt2.apps.googleusercontent.com";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

async function fetchGoogleUserProfile(
  accessToken: string,
): Promise<UserProfile | null> {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();

    return {
      name: data.name,
      email: data.email,
      avatarUrl: data.picture,
    };
  } catch (error) {
    console.error("Error fetching Google user profile:", error);
    return null;
  }
}

export default function LoginScreenWeb() {
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
        response.params.error || "Could not complete login.",
      );
    }
  }, [response, signIn]);

  const handleMockSignIn = () => {
    signIn({
      name: "Kian Popat",
      email: "kian.popat@example.com",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Kian+Popat&background=0D8ABC&color=fff&size=256",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandingSection}>
        <Text style={styles.logo}>aslan.</Text>
        <Text style={styles.subtitle}>Smart Wallet Application (Web)</Text>
      </View>

      <View style={styles.actionSection}>
        <AuthActionCard
          onGoogleSignIn={() => promptAsync()}
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
  brandingSection: { alignItems: "center", marginTop: 60 },
  logo: {
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -1,
    color: "#111111",
  },
  subtitle: { fontSize: 16, color: "#666", marginTop: 8 },
  actionSection: { gap: 16 },
});
