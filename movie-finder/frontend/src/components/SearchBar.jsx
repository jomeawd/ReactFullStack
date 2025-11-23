import React, { useRef, useEffect, useCallback } from 'react'

export default function SearchBar({ value, onChange, onSubmit }) {

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChange = useCallback((e) => {
    onChange(e.target.value)
  }, [onChange])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onSubmit()
  }, [onSubmit])

  return (
    <form onSubmit={handleSubmit} style={{ margin: '12px 0' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Rechercher un film..."
        value={value}
        onChange={handleChange}
        style={{ marginRight: '8px', padding: '8px', minWidth: '300px' }}
      />
      <button type="submit">Rechercher</button>
    </form>
  )
}
