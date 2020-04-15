import React from "react";
import ReactSelectValidationContainer from "./ReactSelectValidationContainer";
import ReactSelect from "./ReactSelect";

const Select = (props) => {
    return (
            <ReactSelectValidationContainer {...props} render={(selected, onChange, validation, disabled) => (
                    <ReactSelect {...props} selected={selected}
                                 onChange={onChange}
                                 validation={validation}
                                 disabled={disabled}
                    />
                )}/>
    )
};

export default Select;