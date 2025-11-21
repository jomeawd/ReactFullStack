import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Settings(){
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <div>
      <h1>Paramètres</h1>
      <div>
        <label>
          <input type="radio" checked={theme==='light'} onChange={()=>setTheme('light')} /> Light
        </label>
        <label style={{marginLeft:12}}>
          <input type="radio" checked={theme==='dark'} onChange={()=>setTheme('dark')} /> Dark
        </label>
      </div>
    </div>
  )
}