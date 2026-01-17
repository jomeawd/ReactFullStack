import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Tentative de connexion...', email);
      const data = await apiLogin(email, password);
      
      console.log('Réponse du serveur:', data);
      
      if (!data.userId || !data.email || !data.role) {
        console.error('Données invalides reçues:', data);
        return { success: false, error: 'Données de connexion invalides' };
      }
      
      const userData = {
        id: data.userId,
        email: data.email,
        role: data.role,
      };
      
      console.log('Utilisateur connecté:', userData);
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password) => {
    try {
      await apiRegister(email, password);
      // Après l'inscription, on connecte automatiquement
      return await login(email, password);
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => !!user;
  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}