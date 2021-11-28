import { useState, useEffect } from "react";
import { currentBookHandler } from "../../lib/utils/state-helpers";
export default function Book({ userStyles, book, setView, setBookFn }) {
    const { textColor, background, accentColor, textBackground } = userStyles;
    const [hover, setHover] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const url = `/book_images/${book.title.split(' ').join('_')}/images/page_0.jpg`

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false)
    }, [])
    if (!isMounted) return null;
    return (
        // make a card for each book
        <article
            className='w-full lg:w-2/3 bg-black h-full flex flex-column items-start justify-center rounded-xl p-3'
            style={{
                maskRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${url})`,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onDoubleClick={() => { currentBookHandler({ book_to_set: book.title, setBookFn, setView }) }}
        >
            {hover &&
                <div
                    className='w-full h-full rounded-xl p-4 flex flex-wrap flex-col justify-around gap-5 text-start text-3xl sm:text-5xl md:text-7xl lg:text-8xl'
                    style={{
                        background: textBackground,
                        color: textColor,
                    }}
                >
                    {book?.series && <span><h1>{book.series}</h1></span>}
                    <span><h2 className='italic'>{book.title}</h2></span>
                </div>
            }
        </article>
    )
}