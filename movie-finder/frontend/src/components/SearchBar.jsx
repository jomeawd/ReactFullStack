import React from 'react'

export default function SearchBar({ value, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: '12px 0' }}>
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginRight: '8px', padding: '8px', minWidth: '300px' }}
      />
      <button type="submit">Rechercher</button>
    </form>
  )
}