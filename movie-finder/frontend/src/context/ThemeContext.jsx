import React, { createContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const ThemeContext = createContext()

export function ThemeProvider({ children }){
const [theme, setTheme] = useLocalStorage('theme', 'light')

useEffect(() => {
document.documentElement.setAttribute('data-theme', theme)
}, [theme])

return (
<ThemeContext.Provider value={{ theme, setTheme }}>
{children}
</ThemeContext.Provider>
)
}