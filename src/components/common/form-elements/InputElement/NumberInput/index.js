import React from 'react';
import InputValidationContainer from "../shared/InputValidationContainer";
import NumberInputElement from "./NumberInputElement";

const NumberInput = (props) => {
    return (
            <InputValidationContainer {...props} render={(register, validation, disabled, name, onChange) => (
                    <NumberInputElement {...props}
                                        register={register}
                                        validation={validation}
                                        disabled={disabled}
                                        name={name}
                                        onChange={onChange}
                    />
            )}/>
    )
};

export default NumberInput;