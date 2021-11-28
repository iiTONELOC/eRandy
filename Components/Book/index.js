import { useState, useEffect } from "react";

export default function Book({ userStyles, book }) {
    const { textColor, background, accentColor } = userStyles;
    const [hover, setHover] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const url = `/book_images/${book.title.split(' ').join('_')}/images/page_0.jpg`
    console.log(`BOOK DATA`, book)
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false)
    }, [])
    return (
        // make a card for each book
        <article
            className='w-full lg:w-1/2 bg-black h-full flex flex-column items-start justify-center rounded-xl p-3 '
            style={{
                backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', maskRepeat: 'no-repeat',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {hover &&
                <div className='w-full h-full bg-black rounded-xl p-4 flex flex-col gap-5'>
                    {book?.series && <h1 className='text-white text-2xl'>{book.series}</h1>}
                    <h1 className='text-white text-2xl'>{book.title}</h1>
                </div>
            }
        </article>
    )
}