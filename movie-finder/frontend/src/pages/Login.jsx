import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isLogin 
      ? await login(email, password)
      : await register(email, password);

    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Une erreur est survenue');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
      
      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          color: '#c33',
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? "S'inscrire" : "Se connecter"}
        </button>
      </p>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>Ou se connecter avec Google</p>
        <a
          href="http://localhost:5005/auth/google"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            textDecoration: 'none',
            color: '#333'
          }}
        >
          <strong>G</strong> Continuer avec Google
        </a>
      </div>
    </div>
  );
}