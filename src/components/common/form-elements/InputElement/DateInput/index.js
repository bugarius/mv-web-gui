import React from 'react';
import InputValidationContainer from "../shared/InputValidationContainer";
import DateInputElement from "./DateInputElement";

const DateInput = (props) => {
    return (
            <InputValidationContainer {...props} render={(register, validation, disabled, name, onChange) => (
                    <DateInputElement {...props}
                                      register={register}
                                      validation={validation}
                                      disabled={disabled}
                                      name={name}
                                      onChange={onChange}
                    />
            )}/>
    )
};

export default DateInput;