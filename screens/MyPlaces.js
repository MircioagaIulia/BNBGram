import { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Colors } from "../constants/styles";
import axios from "axios";

import PlacesList from "../components/Places/PlacesList";
import BackgroundImage from "../components/ui/BackgroundImage";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { UserContext } from "../store/user-context";

function MyPlaces({ route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [loadedPlacesFilter, setLoadedPlacesFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [first, setFirst] = useState(false);

  const BACKEND_URL = "https://bnbgram-41d75-default-rtdb.europe-west1.firebasedatabase.app";

  const userCtx = useContext(UserContext);

  const isFocused = useIsFocused();

  async function fetchMyPlace() {
    const response = await axios.get(BACKEND_URL + "/place.json");

    const places = [];

    for (const key in response.data) {
      if (response.data[key].user === userCtx.email) {
        const placeObj = {
          id: key,
          address: response.data[key].address,
          description: response.data[key].description,
          location: response.data[key].location,
          imageUriC: response.data[key].imageUriC,
          title: response.data[key].title,
          date: response.data[key].date,
          user: response.data[key].user,
        };
        places.push(placeObj);
      }
    }
    return places;
  }

  useEffect(() => {
    async function loadMyPlaces() {
      setIsFetching(true);
      try {
        const myPlaces = await fetchMyPlace();
        if (!first) {
          setLoadedPlacesFilter(myPlaces);
        }
        setLoadedPlaces(myPlaces);
      } catch (error) {
        setError("Could not fetch my places!");
      }
      setIsFetching(false);
    }
    loadMyPlaces();
  }, [route, isFocused]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View my places..." />;
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

export default MyPlaces;

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
