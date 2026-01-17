import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

export default function Settings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <h1>Paramètres</h1>

      {isAuthenticated() ? (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3>👤 Mon compte</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rôle:</strong> {user.role === 'admin' ? '👑 Administrateur' : '👤 Utilisateur'}</p>
        </div>
      ) : (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#fff3cd', 
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <p>Vous n'êtes pas connecté.</p>
          <Link 
            to="/login"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Se connecter
          </Link>
        </div>
      )}

      <h3>🎨 Thème</h3>
      <div>
        <label>
          <input type="radio" checked={theme === 'light'} onChange={() => setTheme('light')} /> Light
        </label>
        <label style={{ marginLeft: 12 }}>
          <input type="radio" checked={theme === 'dark'} onChange={() => setTheme('dark')} /> Dark
        </label>
      </div>
    </div>
  );
}