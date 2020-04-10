import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../services/types/SelectOption";
import * as PropTypes from "prop-types";
import {Harvest} from "../../harvest/types/Harvest";
import useHarvestsReceiver from "../../harvest/service/useHarvestsReceiver";
import {useHistory} from "react-router-dom";

interface Props
{
    value: Harvest | SelectOption;
    onChange: () => void;
    name: string;
    label?: string;
    optional?: boolean;
    disabled?: boolean;
}

const SelectHarvest: React.FC<Props> = ({value: selected, onChange, name, label, optional, disabled}) => {

    const {selected: value, options: harvests} = useHarvestsReceiver(selected);
    const history = useHistory();

    const goToHarvest = (id) => {
        history.push(`/mv/harvest/${id}/info`, {from: window.location.pathname});
    };

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
                            isDisabled={disabled}
                            placeholder={"Wybierz"}/>
                    <span className="invalid-feedback">Field is required</span>
                    {disabled &&
                    <span className="text-muted small">
                        Tego pola nie możesz edytować, ponieważ zbiór został zakmnięty i rozdysponowany.
                        <span className="text-info btn-link" onClick={() => goToHarvest("id" in selected ? selected.id : '')}
                              style={{cursor: 'pointer', display: ("id" in selected && selected.id ? '' : 'none')}}>
                             Przejdź do Zarządzania zbiorem...
                        </span>
                        </span>
                    }
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
    optional: PropTypes.bool,
    disabled: PropTypes.bool
};

export default SelectHarvest;