import { useState, useEffect } from "react";
export async function queryBooks() {
    console.log("Fetching books...");
    const response = await fetch("/api/books");
    const data = await response.json();
    return data
};
export default function getBookData() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        queryBooks().then(data => {
            data?.data?.forEach(_book => {
                const dataObj = JSON.parse(_book);
                setBooks(books => [...books, dataObj]);
            });
            setLoading(false)
        }).catch(err => { console.log(err); setError(true) })
    }, [])

    return {
        loading,
        error,
        books
    }
}