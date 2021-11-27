import Head from 'next/head'
import { useState, useEffect } from "react";
import BookShelf from '../Components/BookShelf'

export function calculateHeight() {
  const navHeight = 0;
  return window.innerHeight - navHeight;
};
export default function Home() {
  const [view, setView] = useState('home');
  const [height, setHeight] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [textColor, setTextColor] = useState('rgb(229, 231, 235)');
  const [accentColor, setAccentColor] = useState('rgb(229, 231, 235)');
  const [background, setBackground] = useState(`rgba(31, 41, 55,${opacity})`);
  const [isMounted, setMounted] = useState(false);
  const userStyles = {
    opacity,
    textColor,
    background,
    accentColor,
  };
  const userAdjustments = {
    setOpacity,
    setTextColor,
    setBackground,
    setAccentColor
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
          handleView={handleView}
          userStyles={userStyles}
          adjustments={userAdjustments}
        />
      }
      {/* section that holds bookshelf */}
      {/* section that holds eReader */}
    </section>
  );
}
