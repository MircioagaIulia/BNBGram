import { useState} from "react";

import PlaceForm from "../components/Places/PlaceForm";
import BackgroundImage from "../components/ui/BackgroundImage";
import { storePlace } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function AddPlace({ navigation }) {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState();

  async function createPlaceHandler(place) {
    setIsCreating(true);
    try {
      await storePlace(place);
      navigation.navigate("AllPlaces", {
        place: place,
      });
    } catch (error) {
      console.log(error);
      setError("Could not post a place!");
      Alert.alert("Not enough arguments", "You have to fill al the fields");
    }
    setIsCreating(false);
  }

  if (error && !isCreating) {
    return <ErrorOverlay message={error} />;
  }

  if (isCreating) {
    return <LoadingOverlay message="Creating place post..." />;
  }

  return (
    <BackgroundImage>
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </BackgroundImage>
  );
}

export default AddPlace;
