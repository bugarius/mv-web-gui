import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFormContext} from "react-hook-form";
import {useFieldValidator} from "../InputElement/shared/useFieldValidator";
import {useValidationSchemaContext} from "../../../winery/validation/ValidationSchemaContext";
import * as PropTypes from 'prop-types';

const ReactSelectValidationContainer = ({name, parentName, render, onChange, value, index, disabled}) => {

    const [selected, setSelected] = useState(value || null);
    const {errors} = useFormContext();
    const {currentSchema} = useValidationSchemaContext();
    const [schema, setSchema] = useState(null);
    const [optional, setOptional] = useState(true);

    const [fieldSchema, fieldError, parentFieldError] = useFieldValidator({
        "name": name,
        "parentName": parentName,
        "currentSchema": currentSchema,
        "index": index,
        "errors": errors
    });

    ////TODO: Sprawdzić co powoduje rerender
    // useEffect(() => {
    //     clearError(name);
    //     setValue(name, selected);
    // }, [clearError, name, selected, setValue]);

    const findError = parentName ? parentFieldError : fieldError;
    const [showError, setShowError] = useState(findError);

    const checkDisabled = useCallback(() => {
        return disabled || (fieldSchema && fieldSchema.disabled);
    }, [fieldSchema, disabled]);
    const [disabledWithValidation, setDisabled] = useState(() => checkDisabled());

    useEffect(() => {
        setSchema(fieldSchema);
        if (fieldSchema)
        {
            setOptional(!fieldSchema.required);
        }
        setDisabled(() => checkDisabled());
        setShowError(findError);
    }, [fieldSchema, checkDisabled, findError]);

    const errorStyle = {
        control: (base) => ({
            ...base,
            borderColor: '#d92550',
            paddingRight: '2.25rem',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right calc(2.25rem / 4)',
            backgroundSize: 'calc(2.25rem / 2) calc(2.25rem / 2)',
            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E\")"
        }),
    };

    const handleOnChange = (selected) => {
        setSelected(selected);
        onChange(selected);
    };

    const validation = useMemo(() => ({
        schema,
        optional,
        showError,
        errorStyle
    }), [schema, optional, showError, errorStyle]);

    if (schema !== null)
    {
        return render(selected, handleOnChange, validation, disabledWithValidation);
    }
    return <></>
};

ReactSelectValidationContainer.propTypes = {
    name: PropTypes.string,
    parentName: PropTypes.string,
    render: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    index: PropTypes.number,
    disabled: PropTypes.bool
};

export default ReactSelectValidationContainer;