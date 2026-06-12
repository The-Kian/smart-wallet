import { StyleSheet, Text, View } from "react-native";

type ScreenHeaderProps = {
  title: string;
  description?: string;
};

export default function ScreenHeader({
  title,
  description,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },
  description: {
    marginTop: 8,
    color: "#475569",
    fontSize: 16,
    lineHeight: 23,
  },
});
