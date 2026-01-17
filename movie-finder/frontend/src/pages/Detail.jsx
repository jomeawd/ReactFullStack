import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/api';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    getMovieById(id)
      .then(movie => {
        console.log('Film chargé:', movie);
        setMovie(movie);
      })
      .catch(err => {
        console.error('Erreur chargement film:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavoriteClick = () => {
    if (!isAuthenticated()) {
      alert('Vous devez être connecté pour ajouter des favoris');
      navigate('/login');
      return;
    }

    if (isFavorite(movie._id)) {
      removeFavorite(movie._id);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Erreur</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Film introuvable</h2>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const inFavorites = isFavorite(movie._id);

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
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          padding: '8px 15px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Retour
      </button>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '30px',
        backgroundColor: 'grey',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <h1 style={{ margin: 0 }}>{movie.title}</h1>
          
          <button
            onClick={handleFavoriteClick}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '32px',
              cursor: 'pointer',
              padding: '5px'
            }}
            title={inFavorites ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {inFavorites ? '❤️' : '🤍'}
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <div>
            <strong>📅 Date de sortie:</strong> {formatDate(movie.releaseDate)}
          </div>
          
          {movie.rating && (
            <div>
              <strong>⭐ Note:</strong> {movie.rating}/10
            </div>
          )}
        </div>

        {movie.genre && movie.genre.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <strong>🎭 Genres:</strong>
            <div style={{ marginTop: '10px' }}>
              {movie.genre.map((g, i) => (
                <span 
                  key={i} 
                  style={{ 
                    display: 'inline-block',
                    padding: '5px 12px',
                    backgroundColor: 'rgb(96, 96, 96)',
                    borderRadius: '15px',
                    fontSize: '14px',
                    marginRight: '8px',
                    marginBottom: '8px'
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

        {movie.description && (
          <div style={{ marginTop: '30px' }}>
            <h3>📖 Synopsis</h3>
            <p style={{ 
              fontSize: '16px', 
              lineHeight: '1.6',
              color: '#333'
            }}>
              {movie.description}
            </p>
          </div>
        )}

        {!movie.description && (
          <div style={{ 
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#666'
          }}>
            <p>Aucune description disponible pour ce film.</p>
          </div>
        )}
      </div>
    </div>
  );
}