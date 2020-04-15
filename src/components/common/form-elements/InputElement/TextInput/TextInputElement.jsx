import React from 'react';
import * as PropTypes from 'prop-types';
import ErrorMessage from "../../../../winery/validation/ErrorMessage";
import {useFormContext} from "react-hook-form";
import {FormGroup} from "reactstrap";

const TextInputElement = ({
                              name, label, onChange, defaultValue,
                              inputId, disabled, register, validation = {}
                          }) => {


    const {triggerValidation} = useFormContext();

    return (
            <fieldset>
                <FormGroup row>
                    <label className="col-md-2 col-form-label" htmlFor={inputId || name}>{label}
                        <span className="text-danger"
                              style={{display: (validation.optional ? 'none' : '')}}> *</span>
                    </label>
                    <div className="col-md-10">
                        <input className={'form-control' + (validation.showError ? ' is-invalid' : '')}
                               ref={register}
                               name={name}
                               type={'text'}
                               id={inputId}
                               defaultValue={defaultValue}
                               onChange={e => onChange(e.target.value)}
                               onKeyUp={async () => {
                                   triggerValidation(name);
                               }}
                               disabled={disabled}
                        />
                        <ErrorMessage name={name} showError={validation.showError}/>
                    </div>
                </FormGroup>
            </fieldset>
    )
};

TextInputElement.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputId: PropTypes.string,
    disabled: PropTypes.bool,
    register: PropTypes.func,
    validation: PropTypes.object,
};

export default TextInputElement;