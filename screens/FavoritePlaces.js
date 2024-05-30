import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import PlacesList from "../components/Places/PlacesList";
import BackgroundImage from "../components/ui/BackgroundImage";
import { fetchFavoritePlace } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { Colors } from "../constants/styles";
import { useContext } from "react";
import { AllPlacesContext } from "../store/allPlaces-context";
import { UserContext } from "../store/user-context";

function FavoritePlaces({ route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadedPlacesFilter, setLoadedPlacesFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [first, setFirst] = useState(false);
  const [favoritePlaces, setFavoritePlaces] = useState([]);

  const isFocused = useIsFocused();
  const userCtx = useContext(UserContext)
  const allPlacesCtx = useContext(AllPlacesContext);

  useEffect(() => {
    async function loadFavoritePlacesId() {
      setIsFetching(true);
      try {
        const favIds = await fetchFavoritePlace();
        const updatedFavoritePlaces = allPlacesCtx.allPlaces.filter((place) =>
          favIds.some((fav) => fav.placeId === place.id && fav.user === userCtx.email)
        );
        setFavoritePlaces(updatedFavoritePlaces.reverse());
        if (!first) {
          setLoadedPlacesFilter(updatedFavoritePlaces);
        } else {
          const addedPlaces = updatedFavoritePlaces.filter(
            (place) => !loadedPlacesFilter.find((p) => p.id === place.id)
          );
          const removedPlaces = loadedPlacesFilter.filter(
            (place) => !updatedFavoritePlaces.find((p) => p.id === place.id)
          );
  
          const newFilteredPlaces = [
            ...loadedPlacesFilter.filter(
              (place) => !removedPlaces.find((p) => p.id === place.id)
            ),
            ...addedPlaces,
          ];
  
          setLoadedPlacesFilter(newFilteredPlaces);
        }
      } catch (error) {
        setError("Could not fetch favorite places!");
      }
      setIsFetching(false);
    }
  
    loadFavoritePlacesId();
  }, [route, isFocused]);
  

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View my favorites places..." />;
  }

  function searchFilter(text) {
    if (text) {
      setFirst(true);
      const newData = favoritePlaces.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setLoadedPlacesFilter(newData);
      setSearch(text);
    } else {
      setLoadedPlacesFilter(favoritePlaces);
      setSearch(text);
    }
  }


  return (
    <BackgroundImage>
      <TextInput
        style={[styles.searchBar, search.length > 0 && styles.highlight]}
        value={search}
        placeholder="Search for places here"
        onChangeText={(text) => searchFilter(text)}
      />
      <PlacesList places={loadedPlacesFilter} />
    </BackgroundImage>
  );
}

export default FavoritePlaces;

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
  test: {
    backgroundColor: "red",
    padding: 4,
    color: "black",
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
