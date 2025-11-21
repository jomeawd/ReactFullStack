import { useState } from 'react'

export default function useLocalStorage(key, initial){
const [state, setState] = useState(() => {
try{ const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial }
catch{ return initial }
})

function set(value){
try{ const v = typeof value === 'function' ? value(state) : value; localStorage.setItem(key, JSON.stringify(v)); setState(v) }
catch(e){ console.error('localStorage set error', e) }
}

return [state, set]
}