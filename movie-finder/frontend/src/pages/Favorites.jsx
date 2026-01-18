import React, { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import MovieCard from '../components/MovieCard'

export default function Favorites(){
  const { favorites } = useContext(FavoritesContext)

  return (
    <div>
      <h1>Favoris</h1>
      {favorites.length === 0 ? <p>Tu n'as pas encore de favoris.</p> : (
        <div className="grid">
          {favorites.map(m => <MovieCard key={m._id} movie={m} />)}
        </div>
      )}
    </div>
  )
}