import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
 
    
    const [activeMenu, setActiveMenu] = useState(false);
    const [isClicked, setIsClicked] = useState({...initialState});
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState("#03C9D7");
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [ formPage, setFormPage ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    
    const loadStart = ()=>{
        setIsLoading(true);
    }
    const loadEnd = ()=>{
        setIsLoading(false);
    }
    
    const setMode = (e)=>{
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false)
    }

    const setColor = (args)=>{
        setCurrentColor(args);
        localStorage.setItem('colorMode', args);
        setThemeSettings(false);
    }
    
    
    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true })
    }
    const persistUser  = JSON.parse(window.localStorage.getItem("user")) || "";
    const [ user, setUser ] = useState(persistUser);
    useEffect(() => {
        window.localStorage.setItem("user", JSON.stringify(user));
    }, [user]);
    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize, setScreenSize,
                currentColor, currentMode,
                themeSettings, setThemeSettings,
                setColor, setMode,
                initialState,
                formPage, setFormPage,
                loadStart, loadEnd, isLoading,
                user, setUser
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext) 