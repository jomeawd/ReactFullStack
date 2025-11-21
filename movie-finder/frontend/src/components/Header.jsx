import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="header container">
      <div>
        <Link to="/"><strong>Movie Finder</strong></Link>
      </div>
      <nav>
        <Link to="/search" style={{marginRight:12}}>Search</Link>
        <Link to="/favorites" style={{marginRight:12}}>Favorites</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </header>
  )
}