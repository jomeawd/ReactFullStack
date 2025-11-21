const API_KEY = "ea819803c4d2f29216d12a7a9e6f7d7f"; // mets ta clef TMDb ici
const BASE = "https://api.themoviedb.org/3";

export async function getRandom(){
  // Exemple simple : prendre la liste "popular"
  const r = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`);
  return r.json();
}

export async function searchMovies(query, page = 1){
  const r = await fetch(`${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=fr-FR`);
  return r.json();
}

export async function getMovie(id){
  const r = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=videos&language=fr-FR`);
  return r.json();
}
