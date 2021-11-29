import ReadAloud from "../../ReadAloud";
import { useState, useEffect } from "react";
import { IoLibrary } from "react-icons/io5";
import { IoMdOptions } from "react-icons/io";
import ButtonWithToolTip from "../../ButtonWithToolTip"
import { setView } from "../../../Providers/GlobalState/helpers";
import { useGlobalStateContext } from "../../../Providers/GlobalState";
import ToolBar from "../ToolBar";
export default function ReaderHeader() {
    const globalState = useGlobalStateContext() || [{}, () => { }];
    const [state, dispatch] = globalState || [{}, () => { }];
    const { currentBook, settings } = state || {};
    const { title, pageText } = currentBook || {};
    const [isMounted, setMounted] = useState(false);
    const headerIcons = [
        {
            Icon: IoLibrary,
            toolTip: 'my library',
            settings: {
                toolTip: {
                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                }
            },
            action: () => { setView({ view: 'home', dispatch }) }
        },
        {
            Icon: IoMdOptions,
            toolTip: 'page settings',
            settings: {
                toolTip: {
                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                }
            },
            action: () => { dispatch({ type: 'TOGGLE_SETTINGS' }) }
        },
        {
            Icon: () => <ReadAloud text={pageText} />,
            toolTip: 'read page to me',
            settings: {
                toolTip: {
                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                }
            },
        },
    ];
    useEffect(() => {
        setMounted(true);
        return () => { setMounted(false) };
    }, []);

    if (!isMounted) return null;

    return (
        <div className='w-full flex flex-row justify-between'>
            <span>
                <h1 className='text-center text-4xl md:text-5xl'>{title}</h1>
            </span>
            <span className='flex flex-row  items-center justify-evenly w-1/4 h-full text-5xl '>
                {
                    !settings ? headerIcons.map((icon, index) => <ButtonWithToolTip key={index} {...icon} />) :
                        <ToolBar />
                }
            </span>
        </div>
    );
};