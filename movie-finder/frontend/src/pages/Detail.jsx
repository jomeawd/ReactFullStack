import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../services/api'

export default function Detail(){
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!id) return
    setLoading(true)
    getMovie(id).then(r=> setMovie(r)).catch(()=>{}).finally(()=>setLoading(false))
  },[id])

  if(loading) return <p>Chargement...</p>
  if(!movie) return <p>Film introuvable</p>

  return (
    <div>
      <h1>{movie.title}</h1>
      <p><strong>Release:</strong> {movie.release_date}</p>
      <p>{movie.overview}</p>
      {/* Affiche bande annonce si présente */}
      {movie.videos?.results?.length > 0 && (
        <div>
          <h3>Bande annonce</h3>
          <iframe title="trailer" width="560" height="315" src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`} allowFullScreen />
        </div>
      )}
    </div>
  )
}