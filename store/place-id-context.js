import { createContext, useState } from "react";

export const PlaceIdContext = createContext({
  storePlaceId: (placeId) => {},
  placeId: "",
});

function PlaceIdContextProvider({ children }) {
  const [placeId, setPlaceId] = useState("");

  function storePlaceId(placeId) {
    setPlaceId(placeId);
    return placeId;
  }

  const value = {
    storePlaceId: storePlaceId,
    placeId: placeId,
  };

  return (
    <PlaceIdContext.Provider value={value}>{children}</PlaceIdContext.Provider>
  );
}

export default PlaceIdContextProvider;
