import React, { useState, useEffect, createContext } from "react";
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategories);
    }, [selectedCategories]);

    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`)
            .then(({ contents }) => {
                setSearchResults(contents);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }

    return (
        <Context.Provider value={{
            loading, setLoading,
            searchResults, setSearchResults,
            selectedCategories, setSelectedCategories,
            mobileMenu, setMobileMenu,
        }}>
            {props.children}
        </Context.Provider>
    )
}