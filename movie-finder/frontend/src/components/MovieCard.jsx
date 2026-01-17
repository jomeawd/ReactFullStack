import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';

export default function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const { isAuthenticated } = useContext(AuthContext);
  
  const inFavorites = isFavorite(movie._id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      alert('Vous devez être connecté pour ajouter des favoris');
      return;
    }

    if (inFavorites) {
      removeFavorite(movie._id);
    } else {
      addFavorite(movie);
    }
  };

  // Format de la date
  const formatDate = (date) => {
    if (!date) return 'Date inconnue';
    return new Date(date).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="movie-card" style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '15px',
      position: 'relative'
    }}>
      <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>{movie.title}</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          {formatDate(movie.releaseDate)}
        </p>
        
        {movie.rating && (
          <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
            ⭐ {movie.rating}/10
          </p>
        )}

        {movie.genre && movie.genre.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            {movie.genre.map((g, i) => (
              <span 
                key={i} 
                style={{ 
                  display: 'inline-block',
                  padding: '3px 8px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginRight: '5px',
                  marginBottom: '5px'
                }}
              >
                {g}
              </span>
            ))}
          </div>
        )}

        {movie.description && (
          <p style={{ 
            fontSize: '14px', 
            marginTop: '10px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}>
            {movie.description}
          </p>
        )}
      </Link>

      <button
        onClick={handleFavoriteClick}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          padding: '5px'
        }}
        title={inFavorites ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        {inFavorites ? '❤️' : '🤍'}
      </button>
    </div>
  );
}