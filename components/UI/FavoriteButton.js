import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";

import { PlaceIdContext } from "../../store/place-id-context";
import { PlaceId } from "../../models/placeId";
import { UserContext } from "../../store/user-context";

function IconButton({ icon, color, onCreateFavoritePlace }) {
  const placeIdCtx = useContext(PlaceIdContext);
  const userCtx = useContext(UserContext);

  function savePlaceIdHandler() {
    const placeIdModel = new PlaceId(placeIdCtx.placeId, userCtx.email);
    onCreateFavoritePlace(placeIdModel);
  }

  return (
    <Pressable
      onPress={savePlaceIdHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
