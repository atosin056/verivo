// UserDataContext.js
import { createContext, useContext } from "react";
export const UserDataContext = createContext(null);
export const useUserData = () => useContext(UserDataContext);
