import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getAllUsers,
  updateUser,
  deleteUser
} from '../services/api';

const styles = {
  container: { maxWidth: 1000, margin: '0 auto' },
  card: { background: '#f5f5f5', padding: 20, color:'black', borderRadius: 8, marginBottom: 30 },
  input: { width: '100%', padding: 8, fontSize: 16, marginBottom: 15 },
  button: (bg) => ({
    padding: '8px 16px',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer'
  }),
  item: {
    padding: 15,
    borderRadius: 8,
    border: '1px solid #ddd',
    marginBottom: 15
  }
};

export default function Admin() {
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tab, setTab] = useState('movies');
  const [loading, setLoading] = useState(false);

  // Films
  const [movies, setMovies] = useState([]);
  const [movieForm, setMovieForm] = useState({ title: '', description: '', rating: '' });
  const [editingMovie, setEditingMovie] = useState(null);

  // Users
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (!user) return;
    if (!isAdmin()) {
      alert('Accès refusé');
      navigate('/');
      return;
    }
    loadMovies();
    loadUsers();
  }, [user]);

  const loadMovies = async () => {
    setLoading(true);
    setMovies(await getAllMovies());
    setLoading(false);
  };

  const loadUsers = async () => {
    setLoading(true);
    setUsers(await getAllUsers());
    setLoading(false);
  };

  /* ================== FILMS ================== */
  const submitMovie = async (e) => {
    e.preventDefault();
    editingMovie
      ? await updateMovie(editingMovie._id, movieForm)
      : await createMovie(movieForm);

    setMovieForm({ title: '', description: '', rating: '' });
    setEditingMovie(null);
    loadMovies();
  };

  const deleteMovieById = async (id) => {
    if (confirm('Supprimer ce film ?')) {
      await deleteMovie(id);
      loadMovies();
    }
  };

  /* ================== USERS ================== */
  const submitUser = async (e) => {
    e.preventDefault();
    await updateUser(editingUser._id, { role });
    setEditingUser(null);
    loadUsers();
  };

  const deleteUserById = async (id) => {
    if (id === user.id) return alert('Impossible');
    if (confirm('Supprimer cet utilisateur ?')) {
      await deleteUser(id);
      loadUsers();
    }
  };

  if (!user || !isAdmin()) return null;

  return (
    <div style={styles.container}>
      <h1>Administration</h1>

      {/* Onglets */}
      <div style={{ display: 'flex', gap: 10, borderBottom: '2px solid #ddd', marginBottom: 30 }}>
        <button
          style={{ ...styles.button(tab === 'movies' ? '#007bff' : '#999') }}
          onClick={() => setTab('movies')}
        >
          🎬 Films ({movies.length})
        </button>
        <button
          style={{ ...styles.button(tab === 'users' ? '#007bff' : '#999') }}
          onClick={() => setTab('users')}
        >
          👥 Utilisateurs ({users.length})
        </button>
      </div>

      {loading && <p>Chargement...</p>}

      {/* ================== FILMS ================== */}
      {tab === 'movies' && (
        <>
          <div style={styles.card}>
            <h2>{editingMovie ? 'Modifier le film' : 'Ajouter un film'}</h2>

            <form onSubmit={submitMovie}>
              <input
                style={styles.input}
                placeholder="Titre"
                value={movieForm.title}
                required
                onChange={e => setMovieForm({ ...movieForm, title: e.target.value })}
              />
              <textarea
                style={styles.input}
                placeholder="Description"
                value={movieForm.description}
                onChange={e => setMovieForm({ ...movieForm, description: e.target.value })}
              />
              <input
                style={styles.input}
                type="number"
                placeholder="Note (0-10)"
                value={movieForm.rating}
                onChange={e => setMovieForm({ ...movieForm, rating: e.target.value })}
              />
              <button style={styles.button('#28a745')}>
                {editingMovie ? 'Modifier' : 'Ajouter'}
              </button>
              {editingMovie && (
                <button
                  type="button"
                  style={{ ...styles.button('#6c757d'), marginLeft: 10 }}
                  onClick={() => setEditingMovie(null)}
                >
                  Annuler
                </button>
              )}
            </form>
          </div>

          {movies.map(m => (
            <div key={m._id} style={styles.item}>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <p><b>Note :</b> {m.rating || 'N/A'}</p>
              <button
                style={styles.button('#007bff')}
                onClick={() => { setEditingMovie(m); setMovieForm(m); }}
              >
                Modifier
              </button>
              <button
                style={{ ...styles.button('#dc3545'), marginLeft: 10 }}
                onClick={() => deleteMovieById(m._id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </>
      )}

      {/* ================== USERS ================== */}
      {tab === 'users' && (
        <>
          {editingUser && (
            <div style={styles.card}>
              <h2>Modifier utilisateur</h2>
              <form onSubmit={submitUser}>
                <p>{editingUser.email}</p>
                <select
                  style={styles.input}
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
                <button style={styles.button('#28a745')}>Modifier</button>
              </form>
            </div>
          )}

          {users.map(u => (
            <div key={u._id} style={styles.item}>
              <b>{u.email}</b> — {u.role}
              <div style={{ marginTop: 10 }}>
                <button
                  style={styles.button('#007bff')}
                  onClick={() => { setEditingUser(u); setRole(u.role); }}
                >
                  Modifier
                </button>
                <button
                  style={{ ...styles.button('#dc3545'), marginLeft: 10 }}
                  onClick={() => deleteUserById(u._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
