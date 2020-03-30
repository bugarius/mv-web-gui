import React, {Component} from 'react';

import {Input} from 'reactstrap';

class SimpleInputElement extends Component {

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
        const {name, placeholder, type, maxSize, defaultValue, onChange, showErrors, disabled, onKeyPress, autoFocus} = this.props;

        return (
                    <>
                                <Input placeholder={placeholder}
                                       name={name}
                                       type={type}
                                       invalid={showErrors}
                                       maxLength={maxSize}
                                       defaultValue={defaultValue}
                                       disabled={disabled}
                                       onChange={onChange}
                                       onKeyPress={onKeyPress}
                                       autoFocus={autoFocus}
                                />
                            <span className="invalid-feedback">Field is required</span></>
        );

    }

}

export default SimpleInputElement;
