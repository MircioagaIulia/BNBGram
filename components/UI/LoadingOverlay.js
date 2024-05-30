import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

import BackgroundImageVenice from "./BackgroundImageVenice";
import { Colors } from "../../constants/styles";

function LoadingOverlay({ message }) {
  return (
    <BackgroundImageVenice>
      <View style={styles.rootContainer}>
        <Text style={styles.message}>{message}</Text>
        <ActivityIndicator size="large" />
      </View>
    </BackgroundImageVenice>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 24,
    marginBottom: 12,
    color: Colors.primary300,
  },
});
