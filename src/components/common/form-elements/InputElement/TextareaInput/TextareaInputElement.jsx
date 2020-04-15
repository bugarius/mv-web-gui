import React from 'react';
import * as PropTypes from 'prop-types';
import ErrorMessage from "../../../../winery/validation/ErrorMessage";
import {useFormContext} from "react-hook-form";
import {FormGroup} from "reactstrap";

const TextareaInputElement = ({
                                  name, label, onChange, defaultValue, rows, cols,
                                  colClass, inputId, disabled, register, validation = {}
                              }) => {

    const {triggerValidation} = useFormContext();

    return (<fieldset>
                <FormGroup row>
                    <label className="col-md-2 col-form-label" htmlFor={inputId || name}>{label}
                        <span className="text-danger"
                              style={{display: validation.optional ? 'none' : ''}}> *</span>
                    </label>
                    <div className="col-md-10">
                        <textarea className={'form-control' + (validation.showError ? ' is-invalid' : '')}
                                  ref={register}
                                  name={name}
                                  rows={rows}
                                  cols={cols}
                                  id={inputId || name}
                                  defaultValue={defaultValue}
                                  onChange={e => onChange(e.target.value)}
                                  onKeyUp={async () => {
                                      triggerValidation(name);
                                  }}
                                  disabled={disabled}
                        />
                    </div>
                    <ErrorMessage name={name} showError={validation.showError}/>
                </FormGroup>
            </fieldset>
    )
};

TextareaInputElement.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colClass: PropTypes.string,
    inputId: PropTypes.string,
    disabled: PropTypes.bool,
    register: PropTypes.func,
    validation: PropTypes.object,
    cols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextareaInputElement;