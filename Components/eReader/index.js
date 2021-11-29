import { useEffect, useState } from "react";
import getSingleBookData from "../../Hooks/getSingleBook";
import ReaderHeader from "./ReaderHeader";
import Page from "./Page";
import { useGlobalStateContext } from "../../Providers/GlobalState";

export default function E_Reader() {
    const globalState = useGlobalStateContext() || [{}, () => { }];
    const [state,] = globalState || [{}, () => { }];
    const [isMounted, setMounted] = useState(false);
    const { textColor, currentBook } = state || {};
    const { title, currentPage, } = currentBook || {};
    useEffect(() => {
        setMounted(true);
        return () => { setMounted(false) };
    }, []);

    if (!isMounted) return null;

    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2 bg-gray-900 overflow-y-auto'
            style={{ color: textColor }}

        >
            <header className='w-full flex flex-row justify-between bg-gray-900'>
                <ReaderHeader
                    title={title}
                    currentPageData={currentPage}
                />
            </header>
            <Page />
        </div>
    );
};