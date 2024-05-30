import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/styles";

import BackgroundImageVenice from "./BackgroundImageVenice";

function ErrorOverlay({ message }) {
  return (
    <BackgroundImageVenice>
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error occurred!</Text>
        <Text style={styles.text}>{message}</Text>
      </View>
    </BackgroundImageVenice>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.primary1000,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
