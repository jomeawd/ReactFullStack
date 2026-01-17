import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Detail from './pages/Detail';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Admin from './pages/Admin';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Header />
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/movie/:id" element={<Detail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}