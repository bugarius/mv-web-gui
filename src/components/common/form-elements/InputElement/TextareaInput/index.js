import React from 'react';
import InputValidationContainer from "../shared/InputValidationContainer";
import TextareaInputElement from "./TextareaInputElement";

const TextareaInput = (props) => {
    return (
            <InputValidationContainer {...props} render={(register, validation, disabled, name, onChange) => (
                    <TextareaInputElement {...props}
                                          register={register}
                                          validation={validation}
                                          disabled={disabled}
                                          name={name}
                                          onChange={onChange}
                    />
            )}/>
    )
};

export default TextareaInput;