import { createContext, useState } from "react";

export const AllPlacesContext = createContext({
  getAllPlaces: (allPaces) => {},
  getIsFetching: (setIsFetching) => {},
  getError: (error) => {},
  allPlaces: [],
  isFetching: false,
  error: "",
});

function AllPlacesContextProvider({ children }) {
  const [allPlaces, setAllPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  function getAllPlaces(allPlaces) {
    setAllPlaces(allPlaces);
    return allPlaces;
  }

  function getIsFetching(isFetching) {
    setIsFetching(isFetching);
    return isFetching;
  }

  function getError(error) {
    setError(error);
    return error;
  }

  const value = {
    getAllPlaces: getAllPlaces,
    getIsFetching: getIsFetching,
    getError: getError,
    allPlaces: allPlaces,
    isFetching: isFetching,
    error: error,
  };

  return (
    <AllPlacesContext.Provider value={value}>
      {children}
    </AllPlacesContext.Provider>
  );
}

export default AllPlacesContextProvider;
