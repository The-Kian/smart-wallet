import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { Alert, StyleSheet, Text, View } from "react-native";

import AuthActionCard from "@/features/auth/components/AuthActionCard";
import { useAuthStore } from "../features/auth/store/useAuthStore";

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "";

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || "",
});

export default function LoginScreenNative() {
  const { signIn } = useAuthStore();

  const handleNativeSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.data?.user;

      signIn({
        name: user?.name || "Unknown",
        email: user?.email || "",
        avatarUrl: user?.photo || "",
      });
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert("Authentication in progress...");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert("Play Services not available or outdated");
          break;
        default:
          Alert.alert("Authentication Failed", error.message || "An unknown error occurred.");
      }
    }
  };

  const handleMockSignIn = () => {
    signIn({
      name: "Mock User",
      email: "mock.user@example.com",
      avatarUrl: "https://ui-avatars.com/api/?name=Mock+User&background=0D8ABC&color=fff&size=256",
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
          onGoogleSignIn={handleNativeSignIn}
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
    paddingHorizontal: 24 
  },
  brandingSection: { 
    alignItems: "center", 
    marginTop: 60 
  },
  logo: { 
    fontSize: 42, 
    fontWeight: "900", 
    letterSpacing: -1, 
    color: "#111111" 
  },
  subtitle: { 
    fontSize: 16, 
    color: "#666", 
    marginTop: 8 
  },
  actionSection: { 
    gap: 16 
  },
});