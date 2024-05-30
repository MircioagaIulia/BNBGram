import { ImageBackground, StyleSheet } from "react-native";

import { Colors } from "../../constants/styles";

export default function BackgroundImageVenice({ children }) {
  return (
    <ImageBackground
      source={require("../../assets/images/Venice.jpg")}
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
    backgroundColor: Colors.primary100,
  },
  backgroundImage: {
    opacity: 0.7,
  },
});
