import React, {ChangeEvent, FC} from 'react';

import {FormGroup, Input} from 'reactstrap';
import {ServiceError} from "../../services/types/Service";

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
    disabled?: boolean;
    error?: ServiceError
}

const InputElement: FC<Props> = ({
                                     label,
                                     name,
                                     optional,
                                     placeholder,
                                     maxSize,
                                     defaultValue,
                                     onChange,
                                     error,
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
                           invalid={error?.hasError?.(name)}
                           maxLength={maxSize}
                           defaultValue={defaultValue}
                           disabled={disabled}
                           onChange={onChange}
                    />
                    <span className="invalid-feedback">{error?.getErrorMessage?.(name)}</span>
                </div>
            </FormGroup>
        </fieldset>
    );

};

export default InputElement;
