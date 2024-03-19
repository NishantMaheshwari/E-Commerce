import { createContext } from "react";
import { useContext } from "react";

export const UsernameContext = createContext();

export const useUsername = () => {
    return useContext(UsernameContext);
}
