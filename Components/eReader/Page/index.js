import { useState, useEffect } from "react";
import { FcPrevious, FcNext } from "react-icons/fc";
import { BiFontSize } from "react-icons/bi";
import ButtonWithToolTip from "../../ButtonWithToolTip"
const buttonSettings = {
    color: 'gray-400',
    hover: 'purple-500'
};
const iconSize = '55px';
const toolTipClasses = 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg';
export default function Page({
    currentPageNumber,
    currentPageImage,
    currentPageData,
    previousPage,
    userStyles,
    nextPage,
    thisBook,
}) {
    const [hover, setHover] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const { textColor, background, accentColor, textBackground } = userStyles;
    useEffect(() => {
        setMounted(true);

        return () => { setMounted(false) };
    }, []);
    document.addEventListener('scroll', (e) => {

        console.log('TRUE')
    })
    if (!isMounted) return null;
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
    }];
    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center mt-6 p-2 rounded-lg overflow-y-auto'
            style={{
                maskRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${currentPageImage})`
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                style={{
                    backgroundColor: !currentPageData ? null : textBackground,
                    color: textColor,
                }}
                className='w-full h-full flex flex-col justify-center items-center rounded-lg overflow-y-auto'
            >
                <div className="flex flex-row gap-2 justify-start h-full w-full ">
                    <div className='w-1/12 k h-full flex flex-col items-start justify-center pl-2'>
                        {hover && <ButtonWithToolTip {...buttonData[0]} />}
                    </div>
                    <div className='w-full h-full flex flex-row items-start justify-center'>
                        {hover && <ButtonWithToolTip
                            Icon={BiFontSize}
                            toolTip={'Adjust font'}
                            settings={{
                                toolTip: {
                                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                                }
                            }}
                        />}
                        <section className='w-full h-full flex flex-col justify-between items-start'>
                            {/* 96 too big 72 is too small */}
                            {
                                currentPageNumber != 0 &&
                                <p className='w-full text-center my-3' style={{ fontSize: '85px', letterSpacing: "5px" }}>
                                    {currentPageData}
                                </p>
                            }
                            {
                                currentPageNumber == 0 &&
                                <span className="w-full h-full flex flex-col justify-between items-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl">
                                    <span ><h1>{thisBook?.series}</h1></span>
                                    <span ><h2 className='italic'>{thisBook.title}</h2></span>
                                    <span ><h3 className='italic'>{thisBook.author}</h3> </span>
                                </span>
                            }
                            <footer
                                className='w-full block text-center mt-5 mb-2'
                            >
                                <p className="text-6xl">- {currentPageNumber} -</p>
                            </footer>
                        </section>
                    </div>
                    <div className='w-1/12 k h-full flex flex-col items-end pr-2 justify-center '>
                        {hover && <ButtonWithToolTip {...buttonData[1]} />}
                    </div>
                </div>
            </div>
        </div>
    )
}