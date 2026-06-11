import { StyleSheet, Text, View } from "react-native";

type PlaceholderScreenProps = {
  title: string;
  description: string;
};

export function PlaceholderScreen({
  title,
  description,
}: PlaceholderScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    maxWidth: 540,
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  title: {
    color: "#0F172A",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
