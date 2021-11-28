import { useEffect, useState } from "react";
import getSingleBookData from "../../Hooks/getSingleBook";
import { FcPrevious, FcNext } from "react-icons/fc";
import ButtonWithToolTip from "../ButtonWithToolTip";
import ReadAloud from "../Book/ReadAloud";
import { size } from "lodash";
const buttonSettings = {
    color: 'gray-400',
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
        if (thisBook && !currentPageData) {
            nextPage(0)
        }
    }, [thisBook]);

    if (!isMounted || !thisBook) return null
    if (!thisBook) { return <h1 className='text-center text-9xl'>NO BOOKS YET!!</h1> }
    { error && <h1 className='text-center text-6xl'>{error}</h1> }
    const buttonData = [{
        Icon: FcPrevious,
        toolTip: "previous page",
        iconSize: iconSize,
        action: previousPage,
        settings: {
            button: {
                color: 'gray-400',
                hover: 'purple-500'
            },
            icon: {
                style: { color: 'white' }
            },
            toolTip: {
                classNames: toolTipClasses,
            },
        },
    },
    {
        Icon: FcNext,
        toolTip: "next page",
        iconSize: iconSize,
        action: nextPage,
        settings: {
            button: { ...buttonSettings },
            icon: {
                style: { color: 'white' }
            },
            toolTip: {
                classNames: toolTipClasses,
            },
        },
    }]
    function nextPage(num) {
        let page_num = num
        if (page_num == 0) {
            setCurrentPageNumber(0);
        } else if (page_num = currentPageNumber + 1 < (thisBook.pages_with_text.length - 1)) {
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
        for (const text in thisBook.pages_with_text[page_num]) {
            setCurrentPageData(thisBook.pages_with_text[page_num][text].trim().split('\n').join(' '));
        };
        const url = `/book_images/${thisBook.title.split(' ').join('_')}/images/page_${page_num !== null ? page_num : 0}.jpg`
        if (url) {
            setCurrentPageImage(url);
        };
    };

    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2 '
            style={{ backgroundColor: background, color: textColor }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <header className='w-full flex flex-row justify-between'>
                <span><h1 className='text-center text-4xl md:text-5xl'>{thisBook.title}</h1></span>
                <span className='flex flex-row  items-center justify-end w-1/3 h-full text-5xl'>
                    {/* TOOL BAR GOES HERE */}
                    <ButtonWithToolTip
                        Icon={() => <ReadAloud text={currentPageData} />}
                        toolTip={'Read Aloud'}
                        settings={{
                            toolTip: {
                                classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                            }
                        }}
                    />
                </span>

            </header>

            <div
                className='w-full h-full flex flex-col justify-center items-center mt-6 p-2 rounded-lg overflow-y-auto'
                style={{
                    maskRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${currentPageImage})`
                }}
            >
                <div
                    style={{
                        backgroundColor: textBackground,
                        color: textColor,
                    }}
                    className='w-full h-full flex flex-col justify-center items-center rounded-lg overflow-y-auto'
                >
                    <div className="flex flex-row gap-2 justify-start h-full w-full ">
                        <div className='w-1/12 k h-full flex flex-col items-start justify-center pl-2'>{hover && <ButtonWithToolTip {...buttonData[0]} />}</div>
                        <div className='w-full h-full flex flex-row items-start justify-center'>
                            <p className='w-full text-8xl text-center my-3'>
                                {currentPageData}
                            </p>
                        </div>
                        <div className='w-1/12 k h-full flex flex-col items-end pr-2 justify-center '>{hover && <ButtonWithToolTip {...buttonData[1]} />}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};