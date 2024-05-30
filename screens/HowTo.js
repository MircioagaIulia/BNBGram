import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import Slider from "../components/ui/Slider";
import { Colors } from "../constants/styles";

function HowTo() {
  return (
    <LinearGradient
      colors={[Colors.primary1100, Colors.primary1200]}
    >
      <SafeAreaView>
        <Slider />
      </SafeAreaView>
    </LinearGradient>
  );
}

export default HowTo;
