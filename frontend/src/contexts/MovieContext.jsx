import {createContext, useContext, useEffect, useState} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addToFavorite = (movie) => {
        setFavorites(prev => {
            if (prev.some(m => m.id === movie.id)) return prev; // Already in list
            return [...prev, movie];
        });
    }


    const removeFromFavorite = (movieID) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieID));
    }

    const isFavorite = (movieID) => {
        return favorites.some(movie => movie.id === movieID);
    }


    const value = {
        favorites,
        addToFavorite,
        removeFromFavorite,
        isFavorite,
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}