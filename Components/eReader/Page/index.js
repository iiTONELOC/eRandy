import { useState, useEffect } from "react";
import { FcPrevious, FcNext } from "react-icons/fc";
import ButtonWithToolTip from "../../ButtonWithToolTip"
import { useGlobalStateContext } from "../../../Providers/GlobalState";
import { previousPage, nextPage } from "../../../Providers/GlobalState/helpers";
import { handlePageHeight } from "../../../lib/utils/utils";
const buttonSettings = {
    color: 'gray-400',
    hover: 'purple-500'
};
const iconSize = '55px';
const toolTipClasses = 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg';

export default function Page() {
    const [hover, setHover] = useState(false);
    const [height, setHeight] = useState(null);
    const globalState = useGlobalStateContext() || [{}, () => { }];
    const [isMounted, setMounted] = useState(false);
    const [state, dispatch] = globalState || [{}, () => { }];
    const { textColor, textBackground, currentBook, adjustableFontSize } = state || {};
    const { currentPage, currentImage, pages, pageText } = currentBook || {};

    useEffect(() => {
        setMounted(true);
        if (isMounted) {
            handlePageHeight(setHeight, 48);
        };
        return () => { setMounted(false) };
    }, [isMounted]);

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
            className='w-full flex flex-row justify-center items-center p-2 rounded-lg overflow-hidden'
            style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundImage: `url(${currentImage})`,
                height: height,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                style={{
                    backgroundColor: pageText.trim() == '' ? null : 'rgba(0,0,0,0.3)',
                    color: textColor,
                }}
                className='w-full h-full flex flex-col justify-center items-center rounded-lg '
            >
                <div className="flex flex-row gap-2 justify-start h-full w-full static">
                    <div className='w-full h-full flex flex-row items-start justify-center'>
                        {/* 96 too big 72 is too small */}
                        <section className='w-full h-full flex flex-col justify-between items-start'>
                            <div className='w-full h-full text-center mt-1 overflow-y-auto rounded-t-xl  p-5'
                                style={{
                                    fontSize: adjustableFontSize,
                                    backgroundColor: pageText.trim() == '' ? null : textBackground,
                                }}
                            >
                                <p>
                                    {pageText}
                                </p>
                            </div>
                            <span className='w-full flex flex-row justify-between  rounded-b-xl'
                                style={{
                                    fontSize: adjustableFontSize,
                                    backgroundColor: pageText.trim() == '' ? null : textBackground,
                                }}
                            >
                                <div className='ml-8 w-1/12  h-full flex flex-col items-start justify-center pl-2'>
                                    {hover && <ButtonWithToolTip {...buttonData[0]} />}
                                </div>
                                <p style={{ fontSize: adjustableFontSize }}>- {currentPage} -</p>
                                <div className='w-1/12  h-full flex flex-col items-end justify-center mr-8 ' >
                                    {hover && <ButtonWithToolTip {...buttonData[1]} />}
                                </div>
                            </span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};