import { useEffect, useState } from "react";
import getSingleBookData from "../../Hooks/getSingleBook";
import ReaderHeader from "./ReaderHeader";
import Page from "./Page";


export default function E_Reader({
    selectedBook,
    adjustments,
    userStyles,
    setBookFn,
    setView,
}) {
    const [isMounted, setMounted] = useState(false);
    const [thisBook, setThisBook] = useState(null);
    const [currentPageData, setCurrentPageData] = useState(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [currentPageImage, setCurrentPageImage] = useState(null);
    const { error, book, loading } = getSingleBookData(selectedBook);
    const { textColor, background, accentColor, textBackground } = userStyles;
    useEffect(() => {
        setMounted(true);
        return () => { setMounted(false); setThisBook(null) };
    }, []);
    useEffect(() => {
        if (book?.data && isMounted) {
            setThisBook(book.data);
        };
    }, [isMounted, book]);
    useEffect(() => {
        if (thisBook && !currentPageData) {
            nextPage(0);
        };
    }, [thisBook]);
    if (!isMounted || !thisBook) return null;
    if (!thisBook) { return <h1 className='text-center text-9xl'>NO BOOKS YET!!</h1> }
    { error && <h1 className='text-center text-6xl'>{error}</h1> }
    function nextPage(num) {
        let page_num = num
        if (page_num == 0) {
            setCurrentPageNumber(0);
        } else if (page_num = currentPageNumber + 1 < (thisBook.pages.length - 1)) {
            page_num = currentPageNumber + 1;
            setCurrentPageNumber(page_num);
            ;
        } else { return false }
        setPicture_setPageText(page_num)
    };
    function previousPage(num) {
        let page_num = num
        if (page_num == 0) {
            setCurrentPageNumber(0);
        } else if (currentPageNumber - 1 >= 0) {
            page_num = currentPageNumber - 1;
            setCurrentPageNumber(page_num);
        } else { return false }
        setPicture_setPageText(page_num);
    };
    function setPicture_setPageText(page_num) {
        for (const text in thisBook.pages[page_num]) {
            setCurrentPageData(thisBook.pages[page_num][text].trim()/*.split('\n').join(' ')*/);
        };
        const url = `/book_images/${thisBook.title.split(' ').join('_')}/page_${page_num !== null ? page_num : 0}.jpg`
        if (url) {
            setCurrentPageImage(url);
        };
    };

    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2 '
            style={{ backgroundColor: background, color: textColor }}

        >
            <header className='w-full flex flex-row justify-between'>
                <ReaderHeader
                    title={thisBook.title}
                    currentPageData={currentPageData}
                    setView={setView}
                />
            </header>
            <Page
                thisBook={thisBook}
                nextPage={nextPage}
                userStyles={userStyles}
                previousPage={previousPage}
                currentPageData={currentPageData}
                currentPageImage={currentPageImage}
                currentPageNumber={currentPageNumber}

            />
        </div>
    );
};