import {useCallback, useEffect, useMemo, useState} from 'react';
import {useFormContext} from "react-hook-form";
import {useBackendErrorContext} from "../../../../error/ErrorContext";
import {useValidationSchemaContext} from "../../../../winery/validation/ValidationSchemaContext";
import {useFieldValidator} from "./useFieldValidator";

const InputValidationContainer = ({name, parentName, render, disabled, onChange, index}) => {

    const {register, errors, clearError, setError} = useFormContext();
    const {deleteError, hasError, getError} = useBackendErrorContext();
    const {currentSchema} = useValidationSchemaContext();
    const [schema, setSchema] = useState({});
    const [optional, setOptional] = useState(true);

    const [fieldSchema, fieldError, parentFieldError, fieldName] = useFieldValidator({
        "name": name,
        "parentName": parentName,
        "currentSchema": currentSchema,
        "index": index,
        "errors": errors
    });

    const onChangeHandler = useCallback((value) => {
        if(hasError(fieldName)) deleteError(fieldName);
        errors && errors[name] && clearError(name);
        if (onChange !== undefined)
        {
            index !== undefined ? onChange(name, value, parentName, index) : onChange(name, value);
        }
    }, [index, fieldName, clearError, deleteError, name, onChange, errors, hasError, parentName]);

    const findError = parentName && !hasError(fieldName) ? parentFieldError : fieldError;
    const [showError, setShowError] = useState(findError);

    const checkDisabled = useCallback(() => {
        return disabled || (fieldSchema && fieldSchema.disabled);
    }, [fieldSchema, disabled]);
    const [disabledWithValidation, setDisabled] = useState(() => checkDisabled());

    useEffect(() => {
        if (hasError(fieldName))
        {
            setError(name, fieldName, getError(fieldName));
        }
        const pattern = fieldSchema && new RegExp(fieldSchema.pattern);
        const validate = () => !hasError(fieldName);

        setSchema({...fieldSchema, pattern, validate});
        setShowError(findError);
        if (fieldSchema)
        {
            setOptional(!fieldSchema.required);
        }
        setDisabled(() => checkDisabled());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldSchema, fieldError, fieldName, setShowError, findError, checkDisabled, hasError, name, setError]);

    const validation = useMemo(() => ({
        schema,
        optional,
        showError
    }), [schema, optional, showError]);

    return render(register(schema), validation, disabledWithValidation, fieldName, onChangeHandler);

};

export default InputValidationContainer;