import { useState, useEffect } from "react";
import { BiFontSize } from "react-icons/bi";
import { FcPrevious, FcNext } from "react-icons/fc";
import ButtonWithToolTip from "../../ButtonWithToolTip"
import { useGlobalStateContext } from "../../../Providers/GlobalState";
import { previousPage, nextPage } from "../../../Providers/GlobalState/helpers";

const buttonSettings = {
    color: 'gray-400',
    hover: 'purple-500'
};
const iconSize = '55px';
const toolTipClasses = 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg';

export default function Page() {
    const [hover, setHover] = useState(false);
    const globalState = useGlobalStateContext() || [{}, () => { }];
    const [isMounted, setMounted] = useState(false);
    const [state, dispatch] = globalState || [{}, () => { }];
    const { textColor, textBackground, currentBook } = state || {};
    const { currentPage, currentImage, pages, pageText } = currentBook || {};

    useEffect(() => {
        setMounted(true);
        return () => { setMounted(false) };
    }, []);

    if (!isMounted) return null;
    const buttonData = [{
        Icon: FcPrevious,
        toolTip: "previous page",
        iconSize: iconSize,
        action: () => { previousPage({ num: currentPage, dispatch, pages }) },
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
        action: () => { nextPage({ num: currentPage, dispatch, pages }) },
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
                backgroundImage: `url(${currentImage})`
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                style={{
                    backgroundColor: !pageText ? null : textBackground,
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
                            <p className='w-full text-center my-3' style={{ fontSize: '85px', letterSpacing: "5px" }}>
                                {pageText}
                            </p>
                            <footer
                                className='w-full block text-center mt-5 mb-2'
                            >
                                <p className="text-6xl">- {currentPage} -</p>
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