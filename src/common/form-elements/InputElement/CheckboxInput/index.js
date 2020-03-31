import React from 'react';
import CheckboxInputElement from "./CheckboxInputElement";
import InputValidationContainer from "../shared/InputValidationContainer";

const CheckboxInput = (props) => {
    return (
            <InputValidationContainer {...props} render={(register, validation, disabled, name, onChange) => (
                    <CheckboxInputElement {...props}
                                          register={register}
                                          validation={validation}
                                          disabled={disabled}
                                          name={name}
                                          onChange={onChange}
                    />
            )}/>
    )
};

export default CheckboxInput;