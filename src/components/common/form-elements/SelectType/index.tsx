import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../../services/types/SelectOption";
import {SelectOptionProps} from "./SelectTypeModel";

interface Props
{
    receiver: (value: any) => { options: SelectOption[], selected: string | SelectOption };
    disabled?: boolean;
}

export const SelectType: React.FC<SelectOptionProps<any> & Props> = ({
                                                value: selected,
                                                onChange, name,
                                                label,
                                                optional,
                                                error,
                                                receiver,
                                                disabled
                                            }) => {

    const {options, selected: value} = receiver(selected);

    const customStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#d92550',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right calc(2.25rem / 4)',
            backgroundSize: 'calc(2.25rem / 2) calc(2.25rem / 2)'
        }),
    };

    return (
        <fieldset>
            <FormGroup row>
                <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                    <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                </label>
                <div className="col-md-10">
                    <Select name={name}
                            options={options}
                            onChange={(s) => onChange(name, s)}
                            value={value}
                            placeholder={"Wybierz"}
                            styles={error?.hasError?.(name) && customStyles}
                            isDisabled={disabled}
                    />
                    <span className="invalid-feedback"
                          style={{display: (error?.hasError?.(name) ? "block" : "none")}}>{error?.getErrorMessage?.(name)}</span>
                </div>
            </FormGroup>
        </fieldset>
    )
};