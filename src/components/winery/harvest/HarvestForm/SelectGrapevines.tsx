import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import useGrapevinesReceiver from "../../grapevine/service/useGrapevinesReceiver";
import {SelectOption} from "../../../../services/types/SelectOption";
import {Grapevine} from "../../grapevine/types/Grapevine";
import {ServiceError} from "../../../../services/types/Service";

interface Props
{
    value: Grapevine | SelectOption;
    onChange: (name: string, selected: Record<string, string>) => void;
    name: string;
    label?: string;
    optional?: boolean;
    error?: ServiceError;
    disabled: boolean;
}

const SelectGrapevines: React.FC<Props> = ({
                                               value: selected,
                                               onChange, name,
                                               label,
                                               optional,
                                               error,
                                               disabled}) => {

    const {selected: value, options: grapevines} = useGrapevinesReceiver(selected);

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
                            options={grapevines}
                            onChange={(s) => onChange(name, s)}
                            value={value}
                            placeholder={"Wybierz"}
                            styles={error?.hasError?.(name) && customStyles}
                            isDisabled={disabled}
                    />
                    <span className="invalid-feedback" style={{display: (error?.hasError?.(name) ? "block" : "none")}}>
                        {error?.getErrorMessage?.(name)}</span>
                </div>
            </FormGroup>
        </fieldset>
    )
};

export default SelectGrapevines;