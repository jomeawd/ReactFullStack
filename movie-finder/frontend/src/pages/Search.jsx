import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/api';

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const results = await searchMovies(query);
      setMovies(results || []);
    } catch (error) {
      console.error('Erreur recherche:', error);
      alert('Erreur lors de la recherche: ' + error.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setMovies([]);
      setHasSearched(false);
    }
  };

  return (
    <div>
      <h1>Rechercher un film</h1>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Titre, description, genre..."
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !query.trim() ? 0.6 : 1
            }}
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>
      </form>

      {loading && <p>Recherche en cours...</p>}

      {!loading && hasSearched && (
        <>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            {movies.length} résultat{movies.length > 1 ? 's' : ''} pour "{query}"
          </p>

          {movies.length === 0 ? (
            <p>Aucun film trouvé pour cette recherche.</p>
          ) : (
            <div className="grid">
              {movies.map(m => (
                <MovieCard key={m._id} movie={m} />
              ))}
            </div>
          )}
        </>
      )}

      {!hasSearched && !loading && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>
          Entrez un titre, une description ou un genre pour rechercher des films
        </p>
      )}
    </div>
  );
}