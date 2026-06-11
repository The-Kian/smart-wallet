import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Header } from "./Header";

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
      <Header />
      <View style={styles.body}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.title}>
              {title}
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              {description}
            </Text>
          </Card.Content>
        </Card>
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
