import { createContext, useState } from "react";

export const PlacesNumberContext = createContext({
  getNumberOfPlaces: (numberOfPlaces) => {},
  numberOfPlaces: 0,
});

function PlacesNumberContextProvider({ children }) {
  const [numberOfPlaces, setNumberOfPlaces] = useState(0);

  function getNumberOfPlaces(numberOfPlaces) {
    setNumberOfPlaces(numberOfPlaces);
    return numberOfPlaces;
  }

  const value = {
    getNumberOfPlaces: getNumberOfPlaces,
    numberOfPlaces: numberOfPlaces,
  };

  return (
    <PlacesNumberContext.Provider value={value}>
      {children}
    </PlacesNumberContext.Provider>
  );
}

export default PlacesNumberContextProvider;
