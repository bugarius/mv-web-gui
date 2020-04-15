import React, {Component} from 'react';
import {FormGroup} from "reactstrap";

class SimpleSelect extends Component {

    renderOptions = () => {
        const {options} = this.props;
        return options.map(this.renderOption)
    };

    renderOption = (option, index) => {
        return <option key={index} value={option.value}>{option.text}</option>;
    };

    render()
    {
        const {value, onChange, showErrors, name, label, disabled, optional} = this.props;

        return (
                <fieldset>
                    <FormGroup row>
                        <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                            <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                        </label>
                        <div className="col-md-10">
                            <select name={name} id={name}
                                    className={'custom-select' + (showErrors ? ' is-invalid' : '')}
                                    value={value} onChange={onChange} disabled={disabled}>
                                <option value="">Wybierz</option>
                                {this.renderOptions()}
                            </select>
                            <span className="invalid-feedback">Field is required</span>
                        </div>
                    </FormGroup>
                </fieldset>


        )
    }
}

export default SimpleSelect;