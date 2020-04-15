import {useState} from "react";

const useToggle = (value?): [boolean, () => void] => {

    const [show, setShow] = useState(value || false);

    const toggleShow = () => {
        setShow(!show);
    };

    return [show, toggleShow];
};

export default useToggle;