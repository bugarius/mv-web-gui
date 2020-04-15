import React from 'react';
import * as PropTypes from 'prop-types';
import ErrorMessage from "../../../../winery/validation/ErrorMessage";
import {useFormContext} from "react-hook-form";

const TogglerElement = ({onChange, label, labelOn, labelOff, checked, inputId, register, name, validation = {}}) => {

    const {triggerValidation} = useFormContext();

    return (
            <div className="widget-content p-sm-1">
                <div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                        <div className="switch has-switch switch-container-class active">
                            <div className="switch-animate switch-on">
                                <div className={"toggle btn btn-primary btn-xs btn-" + (checked ? "primary" : "light off")}
                                     style={{width: '50px', height: '18.5938px'}}>
                                    <input type="checkbox"
                                           onChange={e => onChange(e.target.checked)}
                                           checked={checked}
                                           ref={register}
                                           name={name}
                                           id={inputId || name}
                                           onClick={async () => {
                                               triggerValidation(name);
                                           }}
                                    />
                                    <div className="toggle-group" >
                                        <label htmlFor={inputId || name} className="btn btn-primary btn-xs toggle-on">{labelOn || "Tak"}</label>
                                        <label htmlFor={inputId || name} className={"btn btn-xs toggle-off btn-" + (validation.showError ? 'danger' : 'light')}>
                                            {labelOff || "Nie"}
                                        </label>
                                        <span className="toggle-handle btn btn-light btn-xs"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="widget-content-left">
                        <div className={"form-check-label " + (validation.showError ? 'text-danger' : '')}>{label}</div>
                    </div>
                </div>
                    <ErrorMessage name={name} showError={validation.showError}/>
            </div>
    )
};

TogglerElement.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    labelOn: PropTypes.string,
    labelOff: PropTypes.string,
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    inputId: PropTypes.string,
    register: PropTypes.func,
    name: PropTypes.string,
    validation: PropTypes.object
};

export default TogglerElement;