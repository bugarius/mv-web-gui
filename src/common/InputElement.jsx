import React, {Component} from 'react';

import {FormGroup, Input} from 'reactstrap';

class InputElement extends Component {

    state = {
        dropdownOpen: false
    }
    
    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    render() {
        const {label, name, optional, placeholder, type, maxSize, defaultValue, onChange, showErrors, disabled} = this.props;

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
                                       onChange={onChange}/>
                            <span className="invalid-feedback">Field is required</span>
                            </div>
                        </FormGroup>
                    </fieldset>
        );

    }

}

export default InputElement;
