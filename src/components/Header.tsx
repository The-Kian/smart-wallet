import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderProps = {
  name?: string;
};

export function Header({ name = "Alex" }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.avatarWrap}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.avatar}
          contentFit="cover"
        />
      </View>
      <View>
        <Text style={styles.greeting}>Welcome back</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: "#F8FAFC",
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 3,
    backgroundColor: "#E2E8F0",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 23,
    backgroundColor: "#CBD5E1",
  },
  greeting: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
  },
  name: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 2,
  },
});