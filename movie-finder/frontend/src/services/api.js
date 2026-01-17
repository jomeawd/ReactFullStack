const BASE_URL = "http://localhost:5005";

// Fonction helper pour les appels API
async function apiCall(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // Important pour les sessions/cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Une erreur est survenue' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ============ AUTHENTIFICATION ============
export async function register(email, password) {
  return apiCall('/api/users/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email, password) {
  return apiCall('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  // Pas de route logout dans ton backend, on peut l'ajouter ou juste clearer côté client
  return Promise.resolve();
}

// ============ MOVIES ============
export async function getAllMovies() {
  return apiCall('/api/movies');
}

export async function searchMovies(query) {
  return apiCall(`/api/movies/search?query=${encodeURIComponent(query)}`);
}

export async function getMovieById(id) {
  return apiCall(`/api/movies/${id}`);
}

export async function createMovie(movieData) {
  return apiCall('/api/movies', {
    method: 'POST',
    body: JSON.stringify(movieData),
  });
}

export async function updateMovie(id, movieData) {
  return apiCall(`/api/movies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(movieData),
  });
}

export async function deleteMovie(id) {
  return apiCall(`/api/movies/${id}`, {
    method: 'DELETE',
  });
}

// ============ FAVORITES ============
export async function getFavorites() {
  return apiCall('/api/users/favorites');
}

export async function addFavorite(movieId) {
  return apiCall(`/api/users/favorites/${movieId}`, {
    method: 'POST',
  });
}

export async function removeFavorite(movieId) {
  return apiCall(`/api/users/favorites/${movieId}`, {
    method: 'DELETE',
  });
}

// ============ USERS (Admin) ============
export async function getAllUsers() {
  return apiCall('/api/users');
}

export async function getUserById(id) {
  return apiCall(`/api/users/${id}`);
}

export async function updateUser(id, userData) {
  return apiCall(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

export async function deleteUser(id) {
  return apiCall(`/api/users/${id}`, {
    method: 'DELETE',
  });
}