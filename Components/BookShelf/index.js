import { useGlobalStateContext } from "../../Providers/GlobalState";
import getBookData from "../../Hooks/getBookData";
import { useState, useEffect } from "react";
import Book from "../Book";


export default function BookShelf() {
    const globalState = useGlobalStateContext();
    const [state,] = globalState || [{}, () => { }];
    const { textColor, background, accentColor } = state || {};
    const [isMounted, setMounted] = useState(false);
    const [isOverflow, setOverflow] = useState(false);
    const { books, error } = getBookData();
    const [myBooks, setMyBooks] = useState(null);

    useEffect(() => {
        if (books.length > 0) {
            setMyBooks(books);
        };
    });
    useEffect(() => {
        function handleOverflow() {
            const shelf = document.querySelector("#shelf");
            if (shelf?.scrollWidth > window?.innerWidth) {
                setOverflow(true);
            } else {
                setOverflow(false);
            }
        }
        setMounted(true);
        if (isMounted) {
            handleOverflow();
            window.addEventListener("resize", handleOverflow);
        }

        return () => { setMounted(false); setOverflow(false); window.removeEventListener("resize", handleOverflow); }
    }, [isOverflow])
    if (!myBooks) { return <h1 className='text-gray-400 text-center text-9xl'>NO BOOKS YET!!</h1> }
    { error && <h1 className='text-center text-6xl'>{error}</h1> }
    if (!state) return null;

    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2'
            style={{ backgroundColor: background, color: textColor }}
        >
            <h1 className='text-center text-7xl md:text-9xl underline'>BookShelf</h1>
            <div
                id='shelf'
                className={`w-full h-full flex overflow-x-auto items-center  gap-10 p-8 `}
                style={{
                    backgroundColor: background,
                    justifyContent: isOverflow === true ? "flex-start" : "center",
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
    );
};



