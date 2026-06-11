import { Href, Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function RootLayout() {
  const { isAuthenticated, isHydrated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;

    const inAuthGroup = segments[0] === "login";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login" as Href);
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)" as Href);
    }
  }, [isAuthenticated, isHydrated, segments]);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" testID="loading-indicator" />
      </View>
    );
  }

  return <Slot />;
}
