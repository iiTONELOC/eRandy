import { useState, useEffect } from "react";
import getBookData from "../../Hooks/getBookData";
import Book from "../Book";

export default function BookShelf({ handleView, userStyles, adjustments }) {
    const { textColor, background, accentColor } = userStyles;
    const { books, loading, error } = getBookData();
    const [myBooks, setMyBooks] = useState(null);
    useEffect(() => {
        if (books.length > 0 && !myBooks) {
            setMyBooks(books);
        }
    });
    if (!myBooks) { return <h1 className='text-center text-9xl'>NO BOOKS YET!!</h1> }
    { error && <h1 className='text-center text-6xl'>{error}</h1> }
    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2'
            style={{ backgroundColor: background, color: textColor }}
        >
            <h1 className='text-center text-7xl md:text-9xl'>BookShelf</h1>
            {/* TOOL BAR GOES HERE */}
            <div
                className='w-full h-full flex flex-col justify-center items-center mt-6 py-4 px-4'
                style={{
                    backgroundColor: accentColor,
                    border: `3px solid ${accentColor}`,
                }}
            >
                <div className='w-full h-full flex flex-row overflow-x-auto justify-center items-center p-8'
                    style={{
                        backgroundColor: background,
                    }}
                >
                    {/* BOOKS GO HERE */}
                    {
                        myBooks.map((book, index) => (
                            <Book
                                key={index}
                                userStyles={userStyles}
                                book={book}
                            />
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}