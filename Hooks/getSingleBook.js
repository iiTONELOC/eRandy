import { useState, useEffect } from "react";
export async function querySingleBook(bookName) {
    const response = await fetch(`/api/books/${bookName}`);
    const data = await response.json();
    return data
};
export default function getSingleBookData(name) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [book, setBook] = useState([]);
    useEffect(() => {
        querySingleBook(name).then(data => {
            setBook(data);
            setLoading(false)
        }).catch(err => { console.log(err); setError(true) })
    }, [])
    if (!book) return null;
    return {
        loading,
        error,
        book
    }
}