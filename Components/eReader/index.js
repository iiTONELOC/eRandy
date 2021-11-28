import { useEffect, useState } from "react"
export default function E_Reader({ userStyles, adjustments, setBookFn, setView, book }) {
    const [isMounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        console.log(`E reader`, book)
        return () => setMounted(false)
    }, [])
    if (!isMounted) return null
    return (
        `eReader`
    )
}