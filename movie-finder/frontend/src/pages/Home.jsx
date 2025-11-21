import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getRandom } from '../services/api'

export default function Home(){
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    getRandom().then(r=> setMovies(r.results || []) ).catch(()=>{}).finally(()=>setLoading(false))
  },[])

  return (
    <div>
      <h1>Découvrir</h1>
      {loading ? <p>Chargement...</p> : (
        <div className="grid">
          {movies.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  )
}