import { useState, createContext } from "react";

export const UserContext = createContext({
  email: "",
  storeEmail: (email) => {},
});

function UserContextProvider({ children }) {
  const [email, setEmail] = useState("");

  function storeEmail(email) {
    setEmail(email);
  }

  const value = {
    email: email,
    storeEmail: storeEmail,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
