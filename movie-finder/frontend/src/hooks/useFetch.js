import { useEffect, useState } from 'react'

export default function useFetch(url, opts = null, deps = []){
const [data, setData] = useState(null)
const [loading, setLoading] = useState(Boolean(url))
const [error, setError] = useState(null)

useEffect(() => {
if(!url) return
let mounted = true
setLoading(true); setError(null)
const controller = new AbortController()

fetch(url, { signal: controller.signal, ...opts })
.then(r => { if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
.then(json => { if(mounted) setData(json) })
.catch(err => { if(mounted && err.name !== 'AbortError') setError(err) })
.finally(() => { if(mounted) setLoading(false) })

return () => { mounted = false; controller.abort() }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, deps.length ? deps : [url])

return { data, loading, error }
}