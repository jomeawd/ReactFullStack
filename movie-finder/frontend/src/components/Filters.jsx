import React from 'react'

export default function Filters({ year, setYear }){
  return (
    <div style={{margin:'12px 0'}}>
      <input type="number" placeholder="Année" value={year||''} onChange={e=>setYear(e.target.value)} />
    </div>
  )
}