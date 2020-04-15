import React from 'react';
import * as PropTypes from 'prop-types';
import ErrorMessage from "../../../../winery/validation/ErrorMessage";
import {useFormContext} from "react-hook-form";

const CheckboxInputElement = ({
                                  name, label, onChange, defaultValue,
                                  inline, inputId, disabled, register, validation = {}
                              }) => {

    const {triggerValidation} = useFormContext();

    return (<div className={"custom-checkbox custom-control" + (inline ? " custom-control-inline" : '')}>
                <input className={'custom-control-input' + (validation.showError ? ' is-invalid' : '')}
                       ref={register}
                       name={name}
                       type={'checkbox'}
                       id={inputId || name}
                       checked={defaultValue}
                       onChange={onChange}
                       onClick={async () => {
                           triggerValidation(name);
                       }}
                       disabled={disabled}
                />
                <label htmlFor={inputId || name} className={'custom-control-label'}>{label}</label>
                <ErrorMessage name={name} showError={validation.showError}/>

            </div>
    )
};

CheckboxInputElement.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inline: PropTypes.bool,
    inputId: PropTypes.string,
    disabled: PropTypes.bool,
    register: PropTypes.func,
    validation: PropTypes.object,
};

export default CheckboxInputElement;