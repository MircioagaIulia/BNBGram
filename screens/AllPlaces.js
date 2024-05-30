import { useContext, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet} from "react-native";

import PlacesList from "../components/Places/PlacesList";
import BackgroundImage from "../components/ui/BackgroundImage";
import { fetchPlace } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { Colors } from "../constants/styles";
import { AllPlacesContext } from "../store/allPlaces-context";

function AllPlaces({ route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [loadedPlacesFilter, setLoadedPlacesFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [first, setFirst] = useState(false);

  const isFocused = useIsFocused();
  const allPlacesCtx = useContext(AllPlacesContext);

  useEffect(() => {
    async function loadAllPlaces() {
      setIsFetching(true);
      try {
        const allPlaces = await fetchPlace();
        if (!first) {
          setLoadedPlacesFilter(allPlaces);
        }
        setLoadedPlaces(allPlaces);
        allPlacesCtx.getAllPlaces(allPlaces);
      } catch (error) {
        setError("Could not fetch places!");
      }
      setIsFetching(false);
    }
    loadAllPlaces();
  }, [route, isFocused]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View all places..." />;
  }

  function searchFilter(text) {
    if (text) {
      setFirst(true);
      const newData = loadedPlaces.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setLoadedPlacesFilter(newData);
      setSearch(text);
    } else {
      setLoadedPlacesFilter(loadedPlaces);
      setSearch(text);
    }
  }

  let reversedPlaces = loadedPlacesFilter.slice().reverse();

  return (
    <BackgroundImage>
      <TextInput
        style={[styles.searchBar, search.length > 0 && styles.highlight]}
        value={search}
        placeholder="Search for places here"
        onChangeText={(text) => searchFilter(text)}
      />
      <PlacesList places={reversedPlaces} />
    </BackgroundImage>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary1100,
    backgroundColor: Colors.primary900,
    opacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary500,
    elevation: 7,
    borderRadius: 16,
    width: "95%",
    alignSelf: "center",
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
