import React from 'react';
import * as PropTypes from 'prop-types';

const SimpleInputElement = ({
                                name, type, maxSize, label, onChange, optional, defaultValue, showErrors,
                                colClass, inputId, disabled, prepareErrorMessage, errorMessage
                            }) => {

    const errorId = name + '-error';

    return (<div style={{marginTop: '10px'}} className={colClass}>
                <label htmlFor={inputId || false ? inputId : name}>{label}
                    <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                </label>
                <input className={'form-control' + (showErrors ? ' is-invalid' : '')}
                       name={name}
                       id={inputId || false ? inputId : name}
                       type={type}
                       maxLength={maxSize}
                       defaultValue={defaultValue}
                       onKeyUp={prepareErrorMessage}
                       onBlur={prepareErrorMessage}
                       onChange={onChange}
                       disabled={disabled}
                />
                <em id={errorId} className="error invalid-feedback" style={{display: showErrors ? 'block' : 'none'}}>
                    {
                        errorMessage
                    }

                </em>
            </div>
    )
};

SimpleInputElement.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    maxSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    onChange: PropTypes.func,
    optional: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showErrors: PropTypes.bool,
    colClass: PropTypes.string,
    inputId: PropTypes.string,
    disabled: PropTypes.bool,
    prepareErrorMessage: PropTypes.func,
    errorMessage: PropTypes.string
};

export default SimpleInputElement;