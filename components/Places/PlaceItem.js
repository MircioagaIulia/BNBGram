import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

import { Colors } from "../../constants/styles";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Text>{place.user}</Text>
      <Image style={styles.image} source={{ uri: place.imageUriC }} />

      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
        <Text style={styles.date}>{place.date}</Text>
        <ScrollView>
          <Text style={styles.description}>"{place.description}"</Text>
        </ScrollView>
        <View style={styles.position}></View>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    flex: 1,
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary1000,
    elevation: 5,
    shadowColor: Colors.primary500,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    padding: 5,
    width: "95%",
    alignSelf: "center",
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderRadius: 4,
    height: 180,
  },
  info: {
    flex: 1,
    padding: 12,
    height: 150,
    backgroundColor: Colors.primary1000,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.primary500,
  },
  address: {
    fontSize: 12,
    color: Colors.primary500,
  },
  date: {
    fontSize: 8,
    color: Colors.primary500,
  },
  description: {
    fontSize: 12,
    color: Colors.primary500,
    padding: 12,
  },
  position: {
    flexDirection: "row",
    alignItems: "center",
  },
});
