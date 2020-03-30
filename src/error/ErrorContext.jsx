import React, {useCallback, useContext, useMemo, useState} from "react";
import * as PropTypes from 'prop-types';

const ErrorContext = React.createContext(new Map());

export const useBackendErrorContext = () => useContext(ErrorContext);

const ErrorProvider = ({children}) => {

    const [errors, setErrors] = useState(new Map());

    const hasError = useCallback((key) => {
        return errors.has(key)
    }, [errors]);

    const getError = useCallback((searchKey) => {
        const error = [...errors].find(([key]) => key === searchKey);
        return error && error[1]
    }, [errors]);

    const setErrorsMap = useCallback((errorsObj) => {
        errorsObj && setErrors(Object.keys(errorsObj)
                .reduce((errors, key) =>
                        errors.set(key, errorsObj[key]), new Map()
                )
        );
    }, []);

    const deleteError = useCallback((key) => {
        const err = new Map(errors);
        err.delete(key);
        setErrors(err);
    }, [errors]);

    const providerValue = useMemo(() => ({
        errors,
        setErrors: setErrorsMap,
        hasError,
        getError,
        deleteError
    }), [errors, setErrorsMap, hasError, getError, deleteError]);

    return (
            <ErrorContext.Provider value={providerValue}>
                {children}
            </ErrorContext.Provider>
    )
};

ErrorProvider.propTypes = {
  children: PropTypes.element
};

export default ErrorProvider;