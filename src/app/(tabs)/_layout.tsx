// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Appbar, Avatar, Button } from "react-native-paper";
import { useAuthStore } from "../../store/useAuthStore";

export default function TabLayout() {
  const { user, signOut } = useAuthStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => (
          <Appbar.Header elevated style={styles.headerContainer}>
            <View style={styles.profileSection}>
              <Avatar.Image
                source={{
                  uri: user?.avatarUrl || "https://via.placeholder.com/40",
                }}
                size={40}
              />
              <View style={{ marginLeft: 12 }}>
                <Appbar.Content
                  title={`Welcome back,`}
                  subtitle={user?.name || "User"}
                />
              </View>
            </View>
            <Button mode="text" onPress={signOut} textColor="#EF4444">
              Sign Out
            </Button>
          </Appbar.Header>
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Wallet" }} />
      <Tabs.Screen name="pots" options={{ title: "Pots" }} />
      <Tabs.Screen name="shop" options={{ title: "Shop" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  welcomeText: {
    fontSize: 12,
    color: "#666",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  signOutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#FEE2E2",
  },
  signOutText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 12,
  },
});
