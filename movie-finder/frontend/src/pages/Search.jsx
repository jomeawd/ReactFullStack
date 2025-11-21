import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import MovieCard from '../components/MovieCard'
import { searchMovies } from '../services/api'

export default function Search(){
  const [q, setQ] = useState('')
  const [year, setYear] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  async function doSearch(p = 1){
    if(!q) return
    setLoading(true)
    try{
      const r = await searchMovies(q, p)
      // TMDb returns results; add basic filter by year if provided
      let items = r.results || []
      if(year){ items = items.filter(m => m.release_date && m.release_date.startsWith(String(year))) }
      setResults(items)
    }catch(err){ console.error(err) }
    setLoading(false)
  }

  return (
    <div>
      <h1>Recherche</h1>
      <SearchBar value={q} onChange={setQ} onSubmit={()=>{ setPage(1); doSearch(1) }} />
      <Filters year={year} setYear={setYear} />
      {loading ? <p>Chargement...</p> : (
        <div className="grid">
          {results.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  )
}