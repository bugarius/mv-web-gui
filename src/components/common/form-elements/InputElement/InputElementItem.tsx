import React, {ChangeEvent, FC} from 'react';

import {Input} from 'reactstrap';
import {ServiceError} from "../../../../services/types/Service";

interface Props
{
    label?: string;
    name: string;
    optional?: boolean;
    placeholder?: string;
    type?: string;
    maxSize?: string;
    defaultValue?: string | number | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: ServiceError,
    inputColMd?: string;
    labelColMd?: string;
}

const InputElementItem: FC<Props> = ({
                                         label,
                                         name,
                                         optional,
                                         placeholder,
                                         maxSize,
                                         defaultValue,
                                         onChange,
                                         error,
                                         disabled,
                                         type = "text",
                                         inputColMd = "10",
                                         labelColMd = "2"
                                     }) => {

        return (
            <>
                {label &&
                    <label className={"col-form-label col-md-" + labelColMd} htmlFor={name}>{label}
                        <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                    </label>
                }
                <div className={"col-md-" + inputColMd}>
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
        );

    }
;

export default InputElementItem;
