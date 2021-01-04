import React from 'react';

import {FormGroup, Input} from 'reactstrap';
import PropTypes from 'prop-types';

const InputElement = ({label, name, optional, placeholder, type, maxSize, defaultValue, onChange, showErrors, errorMessage, disabled}) => {

    return (
            <fieldset>
                <FormGroup row>
                    <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                        <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                    </label>
                    <div className="col-md-10">
                        <Input placeholder={placeholder}
                               name={name}
                               type={type}
                               invalid={showErrors}
                               maxLength={maxSize}
                               defaultValue={defaultValue}
                               disabled={disabled}
                               onChange={onChange}
                        />
                        <span className="invalid-feedback">{errorMessage}</span>
                    </div>
                </FormGroup>
            </fieldset>
    );

};

InputElement.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    name: PropTypes.string.isRequired,
    optional: PropTypes.bool,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    maxSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabled: PropTypes.number
};

export default InputElement;
