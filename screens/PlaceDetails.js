import { useEffect, useState, useLayoutEffect, useContext } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { UserContext } from "../store/user-context";
import {
  fetchPlaceDetails,
  deletePlace,
  storeFavoritePlaceId,
  fetchFavoritePlace,
  deleteFavoritePlace,
} from "../util/http";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/styles";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import IconButton from "../components/ui/IconButton";
import FavoriteButton from "../components/ui/FavoriteButton";
import BackgroundImage from "../components/ui/BackgroundImage";
import { PlaceIdContext } from "../store/place-id-context";

function PlaceDetails({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [fetchedPlace, setFetchedPlace] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeIsFavorite, setPlaceIsFavorite] = useState(false);
  const [favId, setFavId] = useState([]);

  const selectedPlaceId = route.params.placeId;
  const userCtx = useContext(UserContext);
  const placeIdCtx = useContext(PlaceIdContext);

  async function changeFavoriteStatusHandler(placeId) {
    if (placeIsFavorite) {
      try {
        await deleteFavoritePlace(selectedPlaceId);
        setPlaceIsFavorite(false);
      } catch (error) {
        setError(error);
      }
    } else {
      try {
        await storeFavoritePlaceId(placeId, selectedPlaceId);
        setPlaceIsFavorite(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <FavoriteButton
            icon={placeIsFavorite ? "star" : "star-outline"}
            color="white"
            onCreateFavoritePlace={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  useEffect(() => {
    async function getFavId() {
      try {
        const favorites = await fetchFavoritePlace();
        setFavId(favorites);
      } catch (error) {
        console.log(error);
      }
    }
    getFavId();
  }, []);

  useEffect(() => {
    async function loadPlaceData() {
      setIsFetching(true);
      try {
        const place = await fetchPlaceDetails(selectedPlaceId);
        setFetchedPlace(place);
        placeIdCtx.storePlaceId(selectedPlaceId);
      } catch (error) {
        setError(
          "Could not fetch place details for " + selectedPlaceId.title + "!"
        );
      }
      setIsFetching(false);
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  useEffect(() => {
    const isPlaceFavorite = favId.some((item) => item.placeId === selectedPlaceId && item.user === userCtx.email);
    setPlaceIsFavorite(isPlaceFavorite);
  }, [favId, selectedPlaceId]);
  

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View place details..." />;
  }

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
      edit: false,
    });
  }

  function acceptDeleteHandler() {
    setModalVisible(true);
  }

  async function deletePlaceHandler() {
    setIsDeleting(true);
    try {
      await deletePlace(selectedPlaceId);
      navigation.navigate("HowMany", {
        placeId: selectedPlaceId,
      });
    } catch (error) {
      setError("Could not delete place!" + selectedPlaceId.title);
    }
    setIsDeleting(false);
  }

  if (error && !isDeleting) {
    return <ErrorOverlay message={error} />;
  }

  if (isDeleting) {
    return <LoadingOverlay message="Deleting place..." />;
  }

  if (modalVisible) {
    return (
      <BackgroundImage>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Are you sure you want to delete this item?
                </Text>
                <View style={styles.modalButtons}>
                  <OutlinedButton onPress={deletePlaceHandler}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </OutlinedButton>
                  <OutlinedButton
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>No</Text>
                  </OutlinedButton>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </BackgroundImage>
    );
  }

  return (
    <ScrollView>
      <LinearGradient
        style={styles.wrapper}
        colors={[Colors.primary1100, Colors.primary1200]}
      >
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUriC }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.address}</Text>

          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.date}</Text>
          </View>
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.description}>"{fetchedPlace.description}"</Text>
          </ScrollView>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View on Map
          </OutlinedButton>

          <View style={styles.deleteContainer}>
            {userCtx.email === fetchedPlace.user ? (
              <View style={styles.actions}>
                <IconButton
                  icon="trash"
                  color={"black"}
                  size={36}
                  onPress={acceptDeleteHandler}
                />
              </View>
            ) : (
              <View style={styles.space} />
            )}
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    elevation: 5,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: Colors.primary300,
    opacity: 0.5,
    borderRadius: 16,
    elevation: 5,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    marginBottom: 8,
    width: "90%",
  },
  description: {
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 16,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "whites",
    alignItems: "center",
    marginBottom: 34,
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  space: {
    height: 48,
  },
});
