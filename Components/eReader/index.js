import { useEffect, useState } from "react";
import getSingleBookData from "../../Hooks/getSingleBook";
import { GrNext, GrPrevious } from "react-icons/gr";
const buttonSettings = {

    color: 'gray-800',
    hover: 'purple-500'

};
const iconSize = '55px';
const toolTipClasses = 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg';
export default function E_Reader({ userStyles, adjustments, setBookFn, setView, selectedBook }) {
    const [hover, setHover] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const [thisBook, setThisBook] = useState(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const { textColor, background, accentColor, textBackground } = userStyles;
    const [currentPageData, setCurrentPageData] = useState(null);
    const [currentPageImage, setCurrentPageImage] = useState(null);
    const { error, book, loading } = getSingleBookData(selectedBook);
    useEffect(() => {
        setMounted(true);
        return () => { setMounted(false); setThisBook(null) };
    }, []);
    useEffect(() => {
        if (book?.data && isMounted) {
            setThisBook(book.data);
        }
    }, [isMounted, book]);
    useEffect(() => {
        setCurrentPageNumber(0);
        if (thisBook) {
            for (const text in thisBook.pages_with_text[currentPageNumber]) {
                setCurrentPageData(thisBook.pages_with_text[currentPageNumber][text].trim());
            }
            const url = `/book_images/${thisBook.title.split(' ').join('_')}/images/page_0.jpg`
            setCurrentPageImage(url);
        }
    }, [thisBook]);
    useEffect(() => {
        if (currentPageData) console.log(currentPageData);
    }, [currentPageData]);
    if (!isMounted || !thisBook) return null
    if (!thisBook) { return <h1 className='text-center text-9xl'>NO BOOKS YET!!</h1> }
    { error && <h1 className='text-center text-6xl'>{error}</h1> }
    const buttonData = [{
        Icon: GrPrevious,
        toolTip: "previous page",
        iconSize: iconSize,
        action: 'previous page',
        settings: {
            button: { ...buttonSettings },
            icon: {
                color: 'yellow'
            },
            toolTip: {
                classNames: toolTipClasses,
            },
        },
    },
    {
        Icon: GrNext,
        toolTip: "next page",
        iconSize: iconSize,
        action: 'next page',
        settings: {
            button: { ...buttonSettings },
            icon: {
                color: 'yellow'
            },
            toolTip: {
                classNames: toolTipClasses,
            },
        },
    }]
    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2'
            style={{ backgroundColor: background, color: textColor }}
        >
            <h1 className='text-center text-4xl md:text-5xl'>{thisBook.title}</h1>
            {/* TOOL BAR GOES HERE */}
            <div
                className='w-full h-full flex flex-col justify-center items-center mt-6 p-2'
                style={{
                    maskRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: currentPageImage
                }}
            >
                <div
                    style={{
                        backgroundColor: textBackground,
                        color: textColor,
                    }}
                    className='w-full h-full flex flex-col justify-center items-center'
                >
                    <p className='text-8xl' >
                        {currentPageData}
                    </p>
                </div>

            </div>
        </div>
    )
};