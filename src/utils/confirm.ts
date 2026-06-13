import { Alert, Platform } from "react-native";

/**
 * Cross-platform confirmation dialog.
 * Uses window.confirm on web and Alert.alert on native.
 */
export function confirm({
  title,
  message,
  confirmLabel = "Confirm",
  confirmStyle,
  onConfirm,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  confirmStyle?: "default" | "destructive";
  onConfirm: () => void;
}): void {
  if (Platform.OS === "web") {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
  } else {
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: confirmLabel, style: confirmStyle, onPress: onConfirm },
    ]);
  }
}
