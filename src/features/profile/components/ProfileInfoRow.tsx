import { StyleSheet, Text, View } from "react-native";

type ProfileInfoRowProps = {
  label: string;
  value: string;
};

export default function ProfileInfoRow({ label, value }: ProfileInfoRowProps) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoItem: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111111",
  },
});
