import { useContext, useEffect } from 'react'
import { UiContext } from '../context/UiContext';

const useHideMenu = (hide) => {

    const {showMenu, hideMenu} = useContext(UiContext);

    useEffect(() => {
        if (hide) {
            hideMenu();
        } else {
            showMenu();
        }
    }, [hide, showMenu, hideMenu]);

}

export default useHideMenu
