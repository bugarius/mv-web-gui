import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../services/types/SelectOption";
import * as PropTypes from "prop-types";
import {Tank} from "../../tank/types/Tank";
import useTanksReceiver from "../../tank/service/useTanksReceiver";
import {useHistory} from "react-router-dom";

interface Props
{
    value: Tank | SelectOption;
    onChange: () => void;
    name: string;
    label?: string;
    optional?: boolean;
    disabled?: boolean;
}

const SelectTank: React.FC<Props> = ({value: selected, onChange, name, label, optional, disabled}) => {

    const {selected: value, options: tanks} = useTanksReceiver(selected);
    const history = useHistory();

    const goToTank = (id) => {
        history.push(`/mv/tank/${id}/info`, {from: window.location.pathname});
    };

    return (
        <fieldset>
            <FormGroup row>
                <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                    <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                </label>
                <div className="col-md-10">
                    <Select name={name}
                            options={tanks}
                            onChange={onChange}
                            value={value}
                            isDisabled={disabled}
                            placeholder={"Wybierz"}/>
                    <span className="invalid-feedback">Field is required</span>
                    {disabled &&
                    <span className="text-muted small">
                        Tego pola nie możesz edytować, ponieważ zbiór został zakmnięty i rozdysponowany.
                        <span className="text-info btn-link" onClick={() => goToTank("id" in selected ? selected.id : '')}
                              style={{cursor: 'pointer', display: ("id" in selected && selected.id ? '' : 'none')}}>
                             Przejdź do Zarządzania nastawem...
                        </span>
                        </span>
                    }
                </div>
            </FormGroup>
        </fieldset>
    )
};

SelectTank.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    optional: PropTypes.bool,
    disabled: PropTypes.bool
};

export default SelectTank;