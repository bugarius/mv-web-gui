import React, {ChangeEvent, FC} from 'react';

import {FormGroup, Input} from 'reactstrap';

interface Props
{
    label: string;
    name: string;
    optional?: boolean;
    placeholder?: string;
    type?: string;
    maxSize?: string;
    defaultValue?: string | number | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showErrors?: boolean;
    errorMessage?: string;
    disabled?: boolean;
}

const InputElement: FC<Props> = ({
                                     label,
                                     name,
                                     optional,
                                     placeholder,
                                     maxSize,
                                     defaultValue,
                                     onChange,
                                     showErrors,
                                     errorMessage,
                                     disabled,
                                     type = "text"
                                 }) => {

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
                           onChange={onChange}
                    />
                    <span className="invalid-feedback">{errorMessage}</span>
                </div>
            </FormGroup>
        </fieldset>
    );

};

export default InputElement;
