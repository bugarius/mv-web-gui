import React from 'react';
import * as PropTypes from 'prop-types';
import ErrorMessage from "../../../../winery/validation/ErrorMessage";
import HelpTip from "../../../HelpTip";
import {useFormContext} from "react-hook-form";
import {FormGroup} from "reactstrap";

const DateInputElement = ({
                              name, label, onChange, defaultValue, colClass,
                              helpText, inputId, disabled, register, validation = {}
                          }) => {

    const {triggerValidation} = useFormContext();

    return (
            <fieldset>
                <FormGroup row>
                    {
                        !helpText &&
                        <label className="col-md-2 col-form-label" htmlFor={inputId || name} style={{width: '100%'}}>
                            {label}
                            <span className="text-danger"
                                  style={{display: validation.optional ? 'none' : ''}}> *</span>
                        </label>
                    }
                    {
                        helpText &&
                        <HelpTip helpText={helpText} name={name} position={'left'} label={label}
                                 optional={validation.optional}/>
                    }
                    <div className="col-md-10">
                        <div className="input-group" style={{marginTop: '10px'}}>
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fa fa-calendar"></i>
                                </div>
                            </div>
                            <input className={'form-control' + (validation.showError ? ' is-invalid' : '')}
                                   ref={register}
                                   name={name}
                                   type={'date'}
                                   id={inputId || name}
                                   defaultValue={defaultValue}
                                   onChange={e => onChange(e.target.value)}
                                   disabled={disabled}
                                   onKeyUp={async () => {
                                       triggerValidation(name);
                                   }}
                            />
                            <ErrorMessage name={name} showError={validation.showError}/>
                        </div>
                    </div>
                </FormGroup>
            </fieldset>
    )
};

DateInputElement.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    helpText: PropTypes.string,
    colClass: PropTypes.string,
    inputId: PropTypes.string,
    disabled: PropTypes.bool,
    register: PropTypes.func,
    validation: PropTypes.object,
};

export default DateInputElement;