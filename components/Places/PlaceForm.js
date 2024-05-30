import { useCallback, useState, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";

import { Colors } from "../../constants/styles";
import Button from "../ui/Button";
import Camera from "./Camera";
import LocationPicker from "./LocationPicker";
import { Place } from "../../models/place";
import { UserContext } from "../../store/user-context";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredText, setEnteredText] = useState("");
  const [selectedImageC, setSelectedImageC] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const userCtx = useContext(UserContext);

  const currentDate = new Date();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function changeTextHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function takeImageHandler(imageUriC) {
    setSelectedImageC(imageUriC);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    if (
      enteredTitle !== "" &&
      enteredText !== "" &&
      selectedImageC !== "" &&
      pickedLocation !== null &&
      currentDate.toDateString() !== "" &&
      userCtx.email !== ""
    ) {
      onCreatePlace(
        new Place(
          enteredTitle,
          enteredText,
          selectedImageC,
          pickedLocation,
          currentDate.toDateString(),
          userCtx.email
        )
      );
    } else {
      Alert.alert(
        "Not enough parameters!",
        "You have to fill all fields to post a place."
      );
    }
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={[styles.input, enteredTitle.length > 0 && styles.highlight]}
            onChangeText={changeTitleHandler}
            value={enteredTitle}
          />
          <Text style={styles.label}>Description</Text>
          <ScrollView>
            <TextInput
              style={[
                styles.description,
                enteredText.length > 0 && styles.highlight,
              ]}
              onChangeText={changeTextHandler}
              value={enteredText}
            />
          </ScrollView>
        </View>
        <Camera onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </View>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
    opacity: 0.8,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary1100,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary900,
    opacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary500,
    elevation: 7,
  },
  description: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary1100,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary900,
    opacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary500,
    elevation: 7,
    height: 100,
  },
  highlight: {
    borderBottomColor: Colors.primary1100,
    borderBottomWidth: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary900,
    elevation: 10,
    fontWeight: "bold",
    opacity: 0.9,
  },
});
