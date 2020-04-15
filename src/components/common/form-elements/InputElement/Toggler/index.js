import React from 'react';
import TogglerElement from "./TogglerElement";
import * as PropTypes from 'prop-types';
import InputValidationContainer from "../shared/InputValidationContainer";

const Toggler = (props) => {

    return (
            <InputValidationContainer {...props} render={(register, validation, disabled, name, onChange) => (
                    <TogglerElement {...props}
                                    register={register}
                                    validation={validation}
                                    name={name}
                                    onChange={onChange}
                    />
            )}/>
    )
};

Toggler.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default Toggler;