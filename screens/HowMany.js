import { View, Text, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import BackgroundImage from "../components/ui/BackgroundImage";
import { Colors } from "../constants/styles";
import OptionsButton from "../components/ui/OptionsButton";
import { numberOfPlaces, fetchPlace } from "../util/http";
import { AllPlacesContext } from "../store/allPlaces-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function HowMany({ navigation, route }) {
  const [placesNumber, setPlacesNumber] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const isFocused = useIsFocused();
  const allPlacesCtx = useContext(AllPlacesContext);

  useEffect(() => {
    async function getNumberOfPlaces() {
      setIsFetching(true);
      try {
        const nrPlaces = await numberOfPlaces();
        setPlacesNumber(nrPlaces);
      } catch (error) {
        setError("Could not fetch number of Places!");
      }
      setIsFetching(false);
    }
    getNumberOfPlaces();
  }, [route, isFocused]);

  useEffect(() => {
    async function loadAllPlaces() {
      setIsFetching(true);
      try {
        const allPlaces = await fetchPlace();
        allPlacesCtx.getAllPlaces(allPlaces);
      } catch (error) {
        setError("Could Not fetch number of Place!");
      }
      setIsFetching(false);
    }
    loadAllPlaces();
  }, [route, isFocused]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="Welcome to BNBGram..." />;
  }

  function seePlacesHandler() {
    navigation.navigate("AllPlaces", {
      numberPlaces: placesNumber,
    });
  }

  function seeHowToHandler() {
    navigation.navigate("HowTo", {
      numberPlaces: placesNumber,
    });
  }

  return (
    <BackgroundImage>
      <View style={styles.viewPort}>
        <View style={styles.box}>
          <Text style={styles.text}>
            You have {placesNumber} places to view !
          </Text>
          <Image
            style={styles.imageStyles}
            source={{
              uri: "https://media2.giphy.com/media/ueVQiEIDXtOV6oQhOW/giphy.gif",
            }}
          />
          <View style={styles.buttons}>
            <OptionsButton onPress={seePlacesHandler}>
              View Places
            </OptionsButton>
            <OptionsButton onPress={seeHowToHandler}>How To</OptionsButton>
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
}

export default HowMany;

const styles = StyleSheet.create({
  viewPort: {
    height: "50%",
    marginTop: "30%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: Colors.primary1000,
    width: "80%",
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    elevation: 5,
    shadowColor: Colors.primary500,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    padding: 24,
    opacity: 0.7,
  },
  text: {
    textShadowColor: Colors.primary500,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    flex: 2,
    fontSize: 20,
  },
  buttons: {
    flexDirection: "row",
    marginHorizontal: 8,
  },
  imageStyles: {
    width: "60%",
    height: "60%",
    elevation: 5,
    shadowColor: Colors.primary500,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    marginBottom: 20,
  },
});
