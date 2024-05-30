import { ImageBackground, StyleSheet} from "react-native";

import { Colors } from "../../constants/styles";

export default function BackgroundImage({ children }) {
  return (
    <ImageBackground
      source={require("../../assets/images/Rome.png")}
      resizeMode="cover"
      style={styles.rootScreen || styles.children}
      imageStyle={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.primary1400,
  },
  backgroundImage: {
    opacity: 0.7,
  },
});
