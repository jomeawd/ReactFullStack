require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const TMDB_KEY = process.env.TMDB_KEY
if(!TMDB_KEY) console.warn('Warning: TMDB_KEY not set in .env')
const TMDB_API = 'https://api.themoviedb.org/3'

app.get('/api/search', async (req, res) => {
  const q = req.query.q || ''
  const page = req.query.page || 1
  try{
    const url = `${TMDB_API}/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(q)}&page=${page}`
    const r = await fetch(url)
    const json = await r.json()
    res.json(json)
  }catch(err){ res.status(500).json({ error: err.message }) }
})

app.get('/api/movie/:id', async (req, res) => {
  try{
    const url = `${TMDB_API}/movie/${req.params.id}?api_key=${TMDB_KEY}&append_to_response=videos,credits`
    const r = await fetch(url)
    const json = await r.json()
    res.json(json)
  }catch(err){ res.status(500).json({ error: err.message }) }
})

app.get('/api/random', async (req, res) => {
  try{
    // récupère les films populaires page 1
    const r = await fetch(`${TMDB_API}/movie/popular?api_key=${TMDB_KEY}&page=1`)
    const json = await r.json()
    const results = json.results || []
    // shuffle & select 8
    const shuffled = results.sort(() => 0.5 - Math.random()).slice(0, 8)
    res.json({ results: shuffled })
  }catch(err){ res.status(500).json({ error: err.message }) }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Proxy listening on ${PORT}`))