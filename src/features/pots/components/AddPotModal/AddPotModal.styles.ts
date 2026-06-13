import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  fieldGroup: {
    marginTop: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  errorText: {
    marginTop: 12,
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "600",
  },
  actions: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  verticalActionStack: {
    marginTop: 24,
    gap: 12,
    width: "100%",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  depositBtn: { backgroundColor: "#0F766E" },
  withdrawBtn: { backgroundColor: "#0284C7" },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  deleteBtn: { borderColor: "#FCA5A5" },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButtonText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButtonText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
  },
  cancelLink: {
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 4,
  },
  cancelLinkText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;
