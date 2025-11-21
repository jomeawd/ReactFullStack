import React, { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }){
const [favorites, setFavorites] = useLocalStorage('favorites', [])

const addFavorite = (movie) => {
setFavorites(prev => {
if(prev.find(m => m.id === movie.id)) return prev
return [movie, ...prev]
})
}

const removeFavorite = (id) => setFavorites(prev => prev.filter(m => m.id !== id))
const isFavorite = (id) => favorites.some(m => m.id === id)

return (
<FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
{children}
</FavoritesContext.Provider>
)
}