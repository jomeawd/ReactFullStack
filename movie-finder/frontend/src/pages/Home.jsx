import React, { useEffect, useState, useMemo } from 'react'
import MovieCard from '../components/MovieCard'
import { getRandom } from '../services/api'

export default function Home(){
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getRandom()
      .then(r => setMovies(r.results || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const movieList = useMemo(() => {
    return movies.map(m => <MovieCard key={m.id} movie={m} />)
  }, [movies])

  return (
    <div>
      <h1>Découvrir</h1>
      {loading ? <p>Chargement...</p> : (
        <div className="grid">
          {movieList}
        </div>
      )}
    </div>
  )
}
