import React, {useCallback, useContext, useEffect, useMemo, useReducer} from 'react';

const MOBILE_WIDTH_EDGE_VALUE = 768;

interface ResponsiveContextInterface
{
    isMobile: boolean;
    isMenuOpen: boolean;
    pageWidth: number,
    pageHeight: number,
    closeMenu: () => void;
    toggleOpenMenu: () => void;
    setIsMobile: (value: boolean) => void;
    setState: (name: string, value: any) => void;
}

const defaultState = {
    pageWidth: window.innerWidth,
    pageHeight: window.innerHeight,
    isMobile: window.innerWidth < 960,
    isMenuOpen: false,
    closeMenu: () => {},
    toggleOpenMenu: () => {},
    setIsMobile: () => {},
    setState: () => {},
};

const reducer = (state: any, action: any) => {
  switch (action.type)
  {
      case "toggleOpenMenu":
          return {...state, isMenuOpen: !state.isMenuOpen};
      case "setIsMobile":
          return {...state, isMobile: action.value};
      case "closeMenu":
          return {...state, isMenuOpen: false};
      default:
          return {...state,  [action.type]: action.value};
  }
};

const ResponsiveContext = React.createContext<ResponsiveContextInterface>(defaultState);
export const useResponsiveContext = (): ResponsiveContextInterface => {
    return useContext(ResponsiveContext);
};

const ResponsiveProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(reducer, defaultState);

    const toggleOpenMenu = useCallback(() => {
        dispatch({type: "toggleOpenMenu"});
    }, []);

    const closeMenu = useCallback(() => {
        dispatch({type: "closeMenu"});
    }, []);

    const setIsMobile = useCallback((isMobile: boolean) => {
        dispatch({type: "setIsMobile", value: isMobile});
    }, []);

    const setState = useCallback((name: string, value: boolean | string | number) => {
        dispatch({type: name, value});
    }, []);

    useEffect(() => {
        const updateDimensions = () => {
            setState("pageWidth", window.innerWidth)
            setState("pageHeight", window.innerHeight)
            setIsMobile(window.innerWidth < MOBILE_WIDTH_EDGE_VALUE);
        };

        window.addEventListener("resize", () => updateDimensions());
        return window.removeEventListener("resize", () => updateDimensions());
    }, [setIsMobile, setState]);

    useEffect(() => {
        const layout = state.isMobile ? "mobile_layout" : "desktop_layout";
        const classNameConfig = {...state.bodyClassNames, layout: layout};
        const classNameString = Object.values(classNameConfig).join(" ");

        document.body.setAttribute("class", classNameString);
        const root = document.getElementById("root");
        if (root) root.className = classNameString;
    }, [state.isMobile, state.bodyClassNames])

    const providerValue = useMemo(() => ({
        isMobile: state.isMobile,
        isMenuOpen: state.isMenuOpen,
        pageWidth: state.pageWidth,
        pageHeight: state.pageHeight,
        closeMenu,
        toggleOpenMenu,
        setIsMobile,
        setState,
    }), [state.isMobile, state.isMenuOpen, state.pageWidth, state.pageHeight, closeMenu, toggleOpenMenu, setIsMobile, setState]);

    return (
        <ResponsiveContext.Provider value={providerValue}>
            {children}
        </ResponsiveContext.Provider>
    )
};

export default ResponsiveProvider;