import {useEffect, useState} from 'react';
import {useBackendErrorContext} from "../../../error/ErrorContext";

const InputErrorMessageContainer = ({name, field, type, maxSize, optionalErrorCondition, optionalErrorText, render, showErrors}) => {

    const {errors, hasError, getError, deleteError} = useBackendErrorContext();
    const fieldName = field ? field + '.' + name : name;
    const [errorMessage, setErrorMessage] = useState(getError(fieldName) || 'Pole wymagane');

    const prepareErrorMessage = ({target: {value}}) => {
        if (optionalErrorCondition && value.length > 0)
        {
            setErrorMessage(optionalErrorText);
        }
        else
        {
            setErrorMessage(value.length > maxSize ? '' +
                    'Dopuszczalna liczba znaków wynosi ' + maxSize : 'Pole wymagane');
        }
        if (type === 'number' && value < 0)
        {
            setErrorMessage('Wartość pola nie może być ujemna');
        }
        deleteError(fieldName);
    };

    const withErrorContext = (showErrors) => {
        return showErrors || hasError(fieldName);
    };

    useEffect(() => {
        if (hasError(fieldName))
        {
            setErrorMessage(getError(fieldName))
        }
    }, [errors, getError, hasError, setErrorMessage, fieldName]);


    return render(prepareErrorMessage, errorMessage, withErrorContext(showErrors));

};

export default InputErrorMessageContainer;