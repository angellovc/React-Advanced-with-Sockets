import React, {createContext, useState} from 'react';

const UiContext = createContext();

const UiProvider = ({children}) => {

    const [menuStatus, setMenuStatus] = useState(false);

    const showMenu = () => {
        setMenuStatus(false);
    };

    const hideMenu = () => {
        setMenuStatus(true);
    };

    return (
        <UiContext.Provider
            value={{
                showMenu,
                hideMenu,
                menuStatus
            }}
        >
            {children}
        </UiContext.Provider>
    );
}

export { UiProvider, UiContext };
