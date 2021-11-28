import Head from 'next/head'
import { useState, useEffect } from "react";
import BookShelf from '../Components/BookShelf'
import E_Reader from '../Components/eReader';
import { currentBookHandler } from '../lib/utils/state-helpers';
export function calculateHeight() {
  const navHeight = 0;
  return window.innerHeight - navHeight;
};
export default function Home() {
  const [view, setView] = useState('home');
  const [opacity, setOpacity] = useState(.9);
  const [height, setHeight] = useState(null);
  const [isMounted, setMounted] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [textColor, setTextColor] = useState('rgb(229, 231, 235)');
  const [accentColor, setAccentColor] = useState('rgb(229, 231, 235)');
  const [background, setBackground] = useState(`rgba(31, 41, 55,1)`);
  const [textBackground, setTextBackground] = useState(`rgba(0, 0,0,${opacity})`);

  const userStyles = {
    opacity,
    textColor,
    background,
    accentColor,
    textBackground,
  };
  const userAdjustments = {
    setOpacity,
    setTextColor,
    setBackground,
    setAccentColor,
    setTextBackground,
  };
  useEffect(() => {
    setMounted(true);
    if (isMounted) {
      setHeight(calculateHeight())
      window.addEventListener('resize', () => {
        setHeight(calculateHeight());
      });
    }
    return () => setMounted(false);
  }, [isMounted]);
  if (!isMounted) return null;
  function handleView(view) {
    setView(view);
  };
  return (
    <section
      style={{
        height: height,
        color: textColor,
        backgroundColor: background,
      }}
      className={`flex flex-col justify-center items-center`}
    >
      {
        view === 'home' &&
        <BookShelf
          userStyles={userStyles}
          adjustments={userAdjustments}
          setBookFn={setCurrentBook}
          setView={handleView}
        />
      }
      {
        view === 'book'
          ?
          <E_Reader
            userStyles={userStyles}
            adjustments={userAdjustments}
            setBookFn={setCurrentBook}
            setView={handleView}
            selectedBook={currentBook}
          /> : null
      }

    </section>
  );
}
