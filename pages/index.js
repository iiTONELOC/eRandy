import { useState, useEffect } from "react";
import BookShelf from '../Components/BookShelf'
import E_Reader from '../Components/eReader';
import { handlePageHeight } from '../lib/utils/utils';
import { useGlobalStateContext } from '../Providers/GlobalState';
export default function Home() {
  const [height, setHeight] = useState(null);
  const globalState = useGlobalStateContext();
  const [isMounted, setMounted] = useState(false);
  const [state,] = globalState || [{}, () => { }];
  const { view } = state || {};

  useEffect(() => {
    setMounted(true);
    if (isMounted) {
      handlePageHeight(setHeight);
    };
    return () => setMounted(false);
  }, [isMounted]);
  if (!isMounted) return null;

  return (
    <section
      style={{
        height: height,
      }}
      className={`flex flex-col justify-center items-center bg-gray-800`}
    >
      {view === 'home' && <BookShelf />}
      {view === 'book' && <E_Reader />}
    </section>
  );
};
