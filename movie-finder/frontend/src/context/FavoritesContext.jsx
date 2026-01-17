import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFavorites, addFavorite as apiAddFavorite, removeFavorite as apiRemoveFavorite } from '../services/api';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  // Charger les favoris au montage si l'utilisateur est connecté
  useEffect(() => {
    if (isAuthenticated()) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error('Erreur chargement favoris:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (movie) => {
    if (!isAuthenticated()) {
      alert('Vous devez être connecté pour ajouter des favoris');
      return;
    }

    try {
      await apiAddFavorite(movie._id);
      setFavorites(prev => {
        if (prev.find(m => m._id === movie._id)) return prev;
        return [movie, ...prev];
      });
    } catch (error) {
      console.error('Erreur ajout favori:', error);
      alert('Erreur lors de l\'ajout du favori');
    }
  };

  const removeFavorite = async (movieId) => {
    if (!isAuthenticated()) return;

    try {
      await apiRemoveFavorite(movieId);
      setFavorites(prev => prev.filter(m => m._id !== movieId));
    } catch (error) {
      console.error('Erreur suppression favori:', error);
      alert('Erreur lors de la suppression du favori');
    }
  };

  const isFavorite = (movieId) => favorites.some(m => m._id === movieId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        addFavorite,
        removeFavorite,
        isFavorite,
        refreshFavorites: loadFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}