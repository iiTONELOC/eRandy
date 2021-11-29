import ReadAloud from "../../ReadAloud";
import { useState, useEffect } from "react";
import { GiBookshelf } from "react-icons/gi";
import ButtonWithToolTip from "../../ButtonWithToolTip"
import { setView } from "../../../Providers/GlobalState/helpers";
import { useGlobalStateContext } from "../../../Providers/GlobalState";
export default function ReaderHeader() {
    const globalState = useGlobalStateContext() || [{}, () => { }];
    const [state, dispatch] = globalState || [{}, () => { }];
    const { view, textColor, background, currentBook } = state || {};
    const { title, currentPage } = currentBook || {};
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        return () => { setMounted(false) };
    }, []);

    if (!isMounted) return null;
    return (
        <>
            <span>
                <h1 className='text-center text-4xl md:text-5xl'>{title}</h1></span>
            <span className='flex flex-row  items-center justify-end w-1/2 h-full text-5xl'>
                {/* TOOL BAR GOES HERE */}
                <ButtonWithToolTip
                    Icon={GiBookshelf}
                    toolTip={'my library'}
                    settings={{
                        toolTip: {
                            classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                        }
                    }}
                    action={() => setView({ view: 'home', dispatch })}
                />
                <ButtonWithToolTip
                    Icon={() => <ReadAloud text={currentPage} />}
                    toolTip={'Read Aloud'}
                    settings={{
                        toolTip: {
                            classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                        }
                    }}
                />
            </span>
        </>
    )
}