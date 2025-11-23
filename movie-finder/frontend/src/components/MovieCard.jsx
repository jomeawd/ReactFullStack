import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FavoritesContext } from '../context/FavoritesContext'

function MovieCard({ movie }){
  const nav = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)
  const fav = isFavorite(movie.id)

  const handleClick = () => nav(`/movie/${movie.id}`)
  const toggleFav = (e) => {
    e.stopPropagation()
    fav ? removeFavorite(movie.id) : addFavorite(movie)
  }

  return (
    <article className="movie-card" onClick={handleClick}>
      <img src={ movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '/no-poster.png' } alt={movie.title} />
      <div className="meta">
        <h4>{movie.title}</h4>
        <small>{movie.release_date}</small>
      </div>
      <button className="icon-btn" onClick={toggleFav}>
        {fav ? '💖' : '🤍'}
      </button>
    </article>
  )
}

export default React.memo(MovieCard)
