import 'tailwindcss/tailwind.css';
import { GlobalStateProvider } from '../Providers/GlobalState';

function MyApp({ Component, pageProps }) {

  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
};

export default MyApp
