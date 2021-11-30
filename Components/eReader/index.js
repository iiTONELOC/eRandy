import { useGlobalStateContext } from "../../Providers/GlobalState";
import { useEffect, useState } from "react";
import ReaderHeader from "./ReaderHeader";
import Page from "./Page";
import { FontColorPicker } from "./ColorPicker/FontColor";
import { TextBackgroundColorPicker } from "./ColorPicker/TextBackground";

export default function E_Reader() {
    const globalState = useGlobalStateContext() || [{}, () => { }];
    const [state, dispatch] = globalState || [{}, () => { }];
    const [isMounted, setMounted] = useState(false);
    const { textColor, currentBook, backgroundPicker, colorPicker } = state || {};
    const { title, currentPage, } = currentBook || {};
    useEffect(() => {
        setMounted(true);

        return () => { setMounted(false) };
    }, []);

    if (!isMounted) return null;
    console.log(colorPicker)
    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2 bg-gray-900 overflow-y-auto static'
        >
            <header className='w-full flex flex-row justify-between bg-gray-900'>
                <ReaderHeader
                    title={title}
                    currentPageData={currentPage}
                />
            </header>
            <Page />

            {colorPicker && <FontColorPicker />}
            {backgroundPicker && <TextBackgroundColorPicker />}
        </div>
    );
};