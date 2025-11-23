import React, { useCallback } from 'react'

export default function Filters({ year, setYear }){
  
  const handleYear = useCallback((e) => {
    setYear(e.target.value)
  }, [setYear])

  return (
    <div style={{margin:'12px 0'}}>
      <input 
        type="number" 
        placeholder="Année"
        value={year || ''} 
        onChange={handleYear} 
      />
    </div>
  )
}
