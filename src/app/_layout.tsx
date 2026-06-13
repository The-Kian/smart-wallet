import { Href, Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import { useWalletStore } from "../features/wallet/store/useWalletStore";
import { usePotsStore } from "../features/pots/store/usePotsStore";

export default function RootLayout() {
  const { isAuthenticated, isHydrated: isAuthHydrated } = useAuthStore();
  const isWalletHydrated = useWalletStore((state) => state.isHydrated);
  const isPotsHydrated = usePotsStore((state) => state.isHydrated);
  const segments = useSegments();
  const router = useRouter();

  const allHydrated = isAuthHydrated && isWalletHydrated && isPotsHydrated;

  useEffect(() => {
    if (!allHydrated) return;

    const inAuthGroup = segments[0] === "login";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login" as Href);
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)" as Href);
    }
  }, [isAuthenticated, allHydrated, segments, router]);

  if (!allHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" testID="loading-indicator" />
      </View>
    );
  }

  return <Slot />;
}
