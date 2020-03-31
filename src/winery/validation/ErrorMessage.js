import React from "react";
import * as PropTypes from 'prop-types';

const ErrorMessage = ({name, showError}) => {

    return (
            <em id={name + 'error'} className="error invalid-feedback"
                style={{display: (showError ? 'block' : 'none')}}>
                {showError && showError.type === 'required' && <p>Pole wymagane!</p>}
                {showError && showError.type === 'max' && <p>Za duża wartość</p>}
                {showError && showError.type === 'min' && <p>Za mała wartość</p>}
                {showError && showError.type === 'maxLength' && <p>Za dużo znaków</p>}
                {showError && showError.type === 'minLength' && <p>Za mało znaków</p>}
                {showError && showError.type === 'pattern' && <p>Nieprawidłowa wartość</p>}
                {showError && showError.type === name && <p>{showError.message}</p>}
                {showError && showError.type === 'checkboxSet' && <p>{showError.message}</p>}
            </em>
    );
};

ErrorMessage.propTypes = {
    validation: PropTypes.object,
    name: PropTypes.string,
    defaultValidateErrorMsg: PropTypes.string,
    showError: PropTypes.object
};

export default ErrorMessage;