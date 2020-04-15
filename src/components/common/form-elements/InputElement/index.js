import React from 'react';
import InputErrorMessageContainer from "./InputErrorMessageContainer";
import SimpleInputElement from "./SimpleInputElement";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import DateInput from "./DateInput";
import TextareaInput from "./TextareaInput";
import CheckboxInput from "./CheckboxInput";

const Input = (props) => {
    return (
            <InputErrorMessageContainer {...props} render={(prepareErrorMessage, errorMessage, showErrors) => (
                    <SimpleInputElement {...props} prepareErrorMessage={prepareErrorMessage}
                                        errorMessage={errorMessage}
                                        showErrors={showErrors}
                    />
            )}/>
    )
};

Input.Text = TextInput;
Input.Number = NumberInput;
Input.Date = DateInput;
Input.Textarea = TextareaInput;
Input.Checkbox = CheckboxInput;

export default Input;