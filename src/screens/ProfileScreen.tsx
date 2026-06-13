import ScreenHeader from "@/components/ui/ScreenHeader";
import ProfileInfoRow from "@/features/profile/components/ProfileInfoRow";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { confirm } from "@/utils/confirm";
import { useAuthStore } from "../features/auth/store/useAuthStore";

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();

  const handleSignOut = () => {
    confirm({
      title: "Sign Out",
      message: "Are you sure you want to sign out?",
      confirmLabel: "Sign Out",
      confirmStyle: "destructive",
      onConfirm: () => {
        signOut();
        router.replace("/login");
      },
    });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User information not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Profile" />

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
          />
        </View>

        <View style={styles.infoSection}>
          <ProfileInfoRow label="Name" value={user.name} />
          <ProfileInfoRow label="Email" value={user.email} />
        </View>

        <Pressable
          onPress={handleSignOut}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Manage your account details, preferences, and security settings.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E6F4FE",
  },
  infoSection: {
    width: "100%",
    marginBottom: 24,
    gap: 16,
  },
  signOutButton: {
    width: "100%",
    backgroundColor: "#FF3B30",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  signOutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  footer: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    marginTop: 20,
  },
});
