import { useState, useEffect } from "react";
import { GiWhiteBook } from "react-icons/gi";
import ButtonWithToolTip from "../ButtonWithToolTip";
import { useGlobalStateContext } from "../../Providers/GlobalState";
import { setBook, setView } from "../../Providers/GlobalState/helpers";

export default function Book({ book }) {
    const [hover, setHover] = useState(false);
    const globalState = useGlobalStateContext();
    const [isMounted, setMounted] = useState(false);
    const [state, dispatch] = globalState || [{}, () => { }];
    const { textColor, textBackground } = state || {};
    const url = `/book_images/${book.title.split(' ').join('_')}/page_0.jpg`;

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);
    if (!isMounted) return null;

    return (
        <article
            className='w-full h-full lg:w-2/3 bg-black flex  flex-column items-start justify-center rounded-xl p-3 static'
            style={{
                maskRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${url})`,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onDoubleClick={() => { setBook({ book, setView, dispatch }) }}
        >
            {hover &&
                <div
                    className='w-full h-full rounded-xl p-4 flex flex-col justify-evenly gap-5 text-3xl sm:text-5xl md:text-7xl lg:text-8xl  static'
                    style={{
                        background: textBackground,
                        color: textColor,
                    }}
                >
                    <span className='overflow-y-auto w-full h-full flex flex-col justify-around'
                        style={{
                            background: textBackground,
                            color: textColor,
                        }}>
                        <h1>{book.series}</h1>
                        <h2 className='italic'>{book.title}</h2>
                        <h3 className='italic'>{book.author}</h3>
                    </span>
                    <span className=' absolute self-end '>
                        <ButtonWithToolTip
                            Icon={GiWhiteBook}
                            toolTip={'Double Click to Read'}
                            settings={{
                                toolTip: {
                                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                                }
                            }}
                        />
                    </span>
                </div>
            }
        </article>
    );
};