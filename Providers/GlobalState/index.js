import { createContext, useContext } from "react";
import { useGlobalReducer } from './reducers';
const globalStateContext = createContext();
const { Provider } = globalStateContext;

const GlobalStateProvider = ({ value = [], ...props }) => {

    const [state, dispatch] = useGlobalReducer({
        textColor: 'rgb(209, 213, 219)',
        background: `rgba(31, 41, 55,1)`,
        accentColor: 'rgb(229, 231, 235)',
        textBackground: `rgba(0, 0,0,.9)`,
        adjustableFontSize: '85px',
        backgroundPicker: false,
        colorPicker: false,
        settings: false,
        currentBook: {
            title: null,
            currentPage: null,
            currentImage: null,
            pageText: null,
            pages: []
        },
        view: 'home',
    });

    return <Provider value={[state, dispatch]} {...props} />;
};
const useGlobalStateContext = () => {
    return useContext(globalStateContext);
};

export { GlobalStateProvider, useGlobalStateContext };