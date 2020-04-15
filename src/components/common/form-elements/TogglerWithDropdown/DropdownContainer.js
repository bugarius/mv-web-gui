import {useCallback, useEffect, useState} from 'react';
import {StringValueValidator} from "../../../winery/services/Validators";

const DropdownContainer = ({render, dropdownName, dropdownValues, togglerValue, onResetValue, onChange}) => {

    const hasValueToOpen = useCallback((value) => {
        if (togglerValue !== undefined && togglerValue !== '')
        {
            return togglerValue;
        }
        if (Array.isArray(value))
        {
            return value.some(v => StringValueValidator.isNotBlank(v));
        }
        return StringValueValidator.isNotBlank(value) || false;
    }, [togglerValue]);

    const [open, setOpen] = useState(() => hasValueToOpen(dropdownValues));

    useEffect(() => {
        setOpen(() => hasValueToOpen(dropdownValues));
    }, [setOpen, hasValueToOpen, dropdownValues]);

    const handleOnChange = () => {
        if (open && onResetValue)
        {
            onResetValue();
        }
        setOpen(!open);
        onChange && onChange(dropdownName, !open);
    };
    return render(handleOnChange, open)
};

export default DropdownContainer;