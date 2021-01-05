import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../../services/types/SelectOption";
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
    showErrors?: boolean;
    errorMessage?: string;
}

const SelectHarvest: React.FC<Props> = ({
                                            value: selected,
                                            onChange,
                                            name,
                                            label,
                                            optional,
                                            disabled,
                                            showErrors,
                                            errorMessage
                                        }) => {

    const {selected: value, options: harvests} = useHarvestsReceiver(selected);
    const history = useHistory();

    const goToHarvest = (id) => {
        history.push(`/mv/harvest/${id}/info`, {from: window.location.pathname});
    };

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
                            options={harvests}
                            onChange={onChange}
                            value={value}
                            isDisabled={disabled}
                            placeholder={"Wybierz"}
                            styles={showErrors && customStyles}
                    />
                    <span className="invalid-feedback"
                          style={{display: (showErrors ? "block" : "none")}}>{errorMessage}</span>
                    {disabled &&
                    <span className="text-muted small">
                        Tego pola nie możesz edytować, ponieważ zbiór został zakmnięty i rozdysponowany.
                        <span className="text-info btn-link"
                              onClick={() => goToHarvest("id" in selected ? selected.id : '')}
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

export default SelectHarvest;