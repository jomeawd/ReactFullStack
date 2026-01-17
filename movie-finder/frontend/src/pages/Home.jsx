import React, { useEffect, useState, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import { getAllMovies } from '../services/api';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getAllMovies()
      .then(data => {
        // Ton backend retourne directement un array de films
        setMovies(data || []);
      })
      .catch(err => {
        console.error('Erreur chargement films:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const movieList = useMemo(() => {
    return movies.map(m => <MovieCard key={m._id} movie={m} />);
  }, [movies]);

  if (loading) {
    return (
      <div>
        <h1>Découvrir</h1>
        <p>Chargement des films...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Découvrir</h1>
        <p style={{ color: 'red' }}>Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Découvrir</h1>
      {movies.length === 0 ? (
        <p>Aucun film disponible pour le moment.</p>
      ) : (
        <div className="grid">
          {movieList}
        </div>
      )}
    </div>
  );
}