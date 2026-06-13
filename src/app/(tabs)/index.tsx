import WalletScreen from "@/screens/WalletScreen";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WalletScreen />
    </SafeAreaView>
  );
}
