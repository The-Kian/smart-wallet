import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

type EmptyStateCardProps = {
  message: string;
};

export default function EmptyStateCard({ message }: EmptyStateCardProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="documents-outline" size={32} color="#CBD5E1" style={styles.icon} />
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
  icon: {
    marginBottom: 8,
  },
  message: {
    color: "#94A3B8",
    fontSize: 15,
  },
});
