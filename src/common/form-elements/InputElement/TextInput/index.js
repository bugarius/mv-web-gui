import React from 'react';
import InputValidationContainer from "../shared/InputValidationContainer";
import TextInputElement from "./TextInputElement";

const TextInput = (props) => {
    return (
            <InputValidationContainer {...props} render={(register, validation, disabled, name, onChange) => (
                    <TextInputElement {...props}
                                      register={register}
                                      validation={validation}
                                      disabled={disabled}
                                      name={name}
                                      onChange={onChange}
                    />
            )}/>
    )
};

export default TextInput;