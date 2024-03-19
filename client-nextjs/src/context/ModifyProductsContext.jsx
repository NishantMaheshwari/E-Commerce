import { createContext } from "react";
import { useContext } from "react";

export const SearchContext = createContext();
export const SortContext = createContext();
export const RatingContext = createContext();
export const CategoryContext = createContext();

export const useSearch = () => {
    return useContext(SearchContext);
}

export const useSort = () => {
    return useContext(SortContext);
}

export const useRating = () => {
    return useContext(RatingContext);
}

export const useCategory = () => {
    return useContext(CategoryContext);
}