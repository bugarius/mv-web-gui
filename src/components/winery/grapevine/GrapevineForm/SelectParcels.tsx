import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import useParcelsReceiver from "../../parcel/service/useParcelsReceiver";
import {SelectOption} from "../../../../services/types/SelectOption";
import {Parcel} from "../../parcel/types/Parcel";

interface Props
{
    value: Parcel[] | SelectOption[];
    onChange: () => void;
    name: string;
    label?: string;
    optional?: boolean;
    showErrors?: boolean;
    errorMessage?: string;
}

const SelectParcels: React.FC<Props> = ({value: selected, onChange, name, label, optional, showErrors, errorMessage}) => {

    const {selected: value, options: parcels} = useParcelsReceiver(selected);

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
                            options={parcels}
                            onChange={onChange}
                            value={value}
                            isMulti
                            placeholder={"Wybierz"}
                            styles={showErrors && customStyles}
                    />
                    <span className="invalid-feedback" style={{display: (showErrors ? "block" : "none")}}>{errorMessage}</span>
                </div>
            </FormGroup>
        </fieldset>
    )
};

export default SelectParcels;