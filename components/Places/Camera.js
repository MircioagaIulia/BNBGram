import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  PermissionsAndroid,
} from "expo-image-picker";
import { useState } from "react";

import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/styles";

function Camera({ onTakeImage }) {
  const [takedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  // async function verifyPermissions() {
  //   if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
  //     const permissionResponse = await requestPermission();

  //     return permissionResponse.granted;
  //   }

  //   if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
  //     Alert.alert(
  //       "Insufficient Permissions!",
  //       "You need to grant camera permissions to use this app."
  //     );
  //     return false;
  //   }

  //   return true;
  // }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "BNBGram Camera Permission",
          message:
            "BNBGram App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          "Permissions don't granted!",
          "You have to try again later."
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
    return true;
  };

  async function takeImageHandler() {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (takedImage) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: takedImage }}
      />
    );
  }

  return (
    <View>
      <View style={[styles.imagePreview, takedImage && styles.imageExists]}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default Camera;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary900,
    borderRadius: 4,
    overflow: "hidden",
    opacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary500,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageExists: {
    opacity: 1,
  },
});
