import React from "react";
import Select from "react-select";
import ErrorMessage from "../../../winery/validation/ErrorMessage";
import {Controller, useFormContext} from "react-hook-form";
import * as PropTypes from 'prop-types';
import {FormGroup} from "reactstrap";

const ReactSelect = ({
                         name, label, validation, options, selected, isMulti, placeholder, isSearchable, disabled,
                         autoFocus, onChange
                     }) => {

    const {triggerValidation} = useFormContext();

    return (
            <fieldset>
                <FormGroup row>
                    <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                        <span className="text-danger"
                              style={{display: validation.optional ? 'none' : ''}}> *</span>
                    </label>
                    <div className="col-md-10">
                        <Controller as={<Select options={options}
                                                isMulti={isMulti}
                                                placeholder={placeholder || "Wybierz"}
                                                isSearchable={isSearchable}
                                                isDisabled={disabled}
                                                styles={validation.showError && validation.errorStyle}
                                                autoFocus={autoFocus}
                                                onBlur={async () => {
                                                    triggerValidation(name);
                                                }}
                        />}
                                    defaultValue={selected}
                                    name={name}
                                    rules={validation.schema}
                                    onChange={([selected]) => onChange(selected)}
                        />

                        <ErrorMessage name={name} showError={validation.showError}/>
                    </div>
                </FormGroup>
            </fieldset>
    )
};

ReactSelect.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    validation: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.object),
    selected: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    isMulti: PropTypes.bool,
    placeholder: PropTypes.string,
    isSearchable: PropTypes.bool,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func
};

export default ReactSelect;