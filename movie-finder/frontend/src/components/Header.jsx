// frontend/src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '15px 0',
      marginBottom: '20px'
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
            🎬 Movie Finder
          </Link>
          
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Découvrir
          </Link>
          
          <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>
            Rechercher
          </Link>
          
          {isAuthenticated() && (
            <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>
              Favoris
            </Link>
          )}
          
          {isAdmin() && (
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>
              Admin
            </Link>
          )}
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {isAuthenticated() ? (
            <>
              <span style={{ fontSize: '14px' }}>
                {user?.email}
                {isAdmin() && <span style={{ marginLeft: '5px', color: '#ffd700' }}>👑</span>}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                padding: '8px 15px',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px'
              }}
            >
              Connexion
            </Link>
          )}
          
          <Link to="/settings" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
            ⚙️
          </Link>
        </div>
      </nav>
    </header>
  );
}