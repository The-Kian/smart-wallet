import { StyleSheet, Text, View } from "react-native";

type EmptyStateCardProps = {
  message: string;
};

export default function EmptyStateCard({ message }: EmptyStateCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 28,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  message: {
    color: "#94A3B8",
    fontSize: 15,
  },
});
