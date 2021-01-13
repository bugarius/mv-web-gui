import React, {ChangeEvent, FC} from 'react';

import {Input} from 'reactstrap';
import {ServiceError} from "../../services/types/Service";
import {InputElementSection} from "./form-elements/InputElement/InputElementSection";

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
        <InputElementSection>
            <>
                {label &&
                    <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                        <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                    </label>
                }
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
            </>
        </InputElementSection>
    );

};

export default InputElement;
