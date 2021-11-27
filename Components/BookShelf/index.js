import { useState, useEffect } from "react";
export async function queryBooks() {
    console.log("Fetching books...");
    const response = await fetch("/api/books");
    const data = await response.json();
    return data
};

export default function BookShelf({ handleView, userStyles, adjustments }) {
    const { textColor, background, accentColor } = userStyles;
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        queryBooks().then(data => {
            data?.data?.forEach(_book => {
                const dataObj = JSON.parse(_book);
                setBooks(books => [...books, dataObj]);
            });
            setLoading(false)
        }).catch(err => { console.log(err); setError(true) })
    }, [])
    console.log(books);
    if (loading) {
        return <h1 className='text-center text-9xl'>NO BOOKS YET!!</h1>
    }
    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2'
            style={{ backgroundColor: background, color: textColor }}
        >
            <h1 className='text-center text-9xl'>BookShelf</h1>
            {/* TOOL BAR GOES HERE */}
            <div
                className='w-full h-full flex flex-col justify-center items-center mt-6 py-4 px-4'
                style={{
                    backgroundColor: accentColor,
                    border: `3px solid ${accentColor}`,
                }}
            >
                <div className='w-full h-full flex flex-row overflow-x-auto'
                    style={{
                        backgroundColor: background,
                    }}
                >
                    {/* BOOKS GO HERE */}
                </div>
            </div>
        </div>
    )
}