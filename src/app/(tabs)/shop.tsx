import { PlaceholderScreen } from "../../screens/PlaceholderScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Shop() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PlaceholderScreen
        title="Shop"
        description="Browse products and offers tailored to your budget."
      />
    </SafeAreaView>
  );
}
