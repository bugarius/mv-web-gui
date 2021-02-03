import {useState} from "react";

export const useElementToShow = () => {
    const [elementToShow, setElementToShow] = useState({id: null, isOpen: false});

    const onClick = (id) => {
        setElementToShow({id: id, isOpen: elementToShow.id === id ? !elementToShow.isOpen : true});
    };
    return [elementToShow, onClick];
};