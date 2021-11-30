import { useGlobalStateContext } from "../../Providers/GlobalState";
import getBookData from "../../Hooks/getBookData";
import { useState, useEffect } from "react";
import Book from "../Book";


export default function BookShelf() {
    const globalState = useGlobalStateContext();
    const [state,] = globalState || [{}, () => { }];
    const { textColor, background, accentColor } = state || {};
    const { books, error } = getBookData();
    const [myBooks, setMyBooks] = useState(null);
    useEffect(() => {
        if (books.length > 0 && !myBooks) {
            setMyBooks(books);
        };
    });
    if (!myBooks) { return <h1 className='text-center text-9xl'>NO BOOKS YET!!</h1> }
    { error && <h1 className='text-center text-6xl'>{error}</h1> }
    if (!state) return null;
    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2'
            style={{ backgroundColor: background, color: textColor }}
        >
            <h1 className='text-center text-7xl md:text-9xl underline'>BookShelf</h1>
            {/* TOOL BAR GOES HERE */}
            <div
                className='w-full h-full flex flex-col justify-center items-center mt-6 '
                style={{
                    backgroundColor: accentColor,
                }}
            >
                <div className='w-full h-full flex flex-row overflow-x-auto justify-center items-center p-8'
                    style={{
                        backgroundColor: background,
                    }}
                >
                    {myBooks.map(book =>
                        <Book
                            key={book.title}
                            book={book}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};



