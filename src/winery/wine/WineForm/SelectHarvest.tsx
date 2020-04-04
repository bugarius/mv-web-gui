import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../services/types/SelectOption";
import * as PropTypes from "prop-types";
import {Harvest} from "../../harvest/types/Harvest";
import useHarvestsReceiver from "../../harvest/service/useHarvestsReceiver";

interface Props
{
    value: Harvest | SelectOption;
    onChange: () => void;
    name: string;
    label?: string;
    optional?: boolean;
}

const SelectHarvest: React.FC<Props> = ({value: selected, onChange, name, label, optional}) => {

    const {selected: value} = useHarvestsReceiver(selected);
    const {options: harvests} = useHarvestsReceiver();

    return (
        <fieldset>
            <FormGroup row>
                <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                    <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                </label>
                <div className="col-md-10">
                    <Select name={name}
                            options={harvests}
                            onChange={onChange}
                            value={value}
                            placeholder={"Wybierz"}/>
                    <span className="invalid-feedback">Field is required</span>
                </div>
            </FormGroup>
        </fieldset>
    )
};

SelectHarvest.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    optional: PropTypes.bool
};

export default SelectHarvest;