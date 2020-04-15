import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import useParcelsReceiver from "../../parcel/service/useParcelsReceiver";
import {SelectOption} from "../../../../services/types/SelectOption";
import {Parcel} from "../../parcel/types/Parcel";
import * as PropTypes from "prop-types";

interface Props
{
    value: Parcel[] | SelectOption[];
    onChange: () => void;
    name: string;
    label?: string;
    optional?: boolean;
}

const SelectParcels: React.FC<Props> = ({value: selected, onChange, name, label, optional}) => {

    const {selected: value, options: parcels} = useParcelsReceiver(selected);

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
                            placeholder={"Wybierz"}/>
                    <span className="invalid-feedback">Field is required</span>
                </div>
            </FormGroup>
        </fieldset>
    )
};

SelectParcels.propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    optional: PropTypes.bool
};

export default SelectParcels;