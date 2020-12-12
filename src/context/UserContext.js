import React from "react";
import { useAuth } from "./AuthContext";
//CREATE CONTEXT
const UserContext = React.createContext();

//PROVIDER
function UserProvider({user, ...rest}) {
  let data = useAuth();
  let userData = user || data?.data;
  return <UserContext.Provider value={userData} {...rest} />;
}

//MUTATION / GETTER
function useUser() {
  const context = React.useContext(UserContext);
  return context;
}

export { UserProvider, useUser, UserContext };
