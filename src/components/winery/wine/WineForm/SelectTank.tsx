import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../../services/types/SelectOption";
import {Tank} from "../../tank/types/Tank";
import useTanksReceiver from "../../tank/service/useTanksReceiver";
import {useHistory} from "react-router-dom";
import {ServiceError} from "../../../../services/types/Service";

interface Props
{
    value: Tank | SelectOption;
    onChange: () => void;
    name: string;
    label?: string;
    optional?: boolean;
    disabled?: boolean;
    error?: ServiceError;
}

const SelectTank: React.FC<Props> = ({
                                         value: selected,
                                         onChange,
                                         name,
                                         label,
                                         optional,
                                         disabled,
                                         error}) => {

    const {selected: value, options: tanks} = useTanksReceiver(selected);
    const history = useHistory();

    const goToTank = (id) => {
        history.push(`/mv/tank/${id}/info`, {from: window.location.pathname});
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
                            options={tanks}
                            onChange={onChange}
                            value={value}
                            isDisabled={disabled}
                            placeholder={"Wybierz"}
                            styles={error?.hasError?.(name) && customStyles}
                    />
                    <span className="invalid-feedback" style={{display: (error?.hasError?.(name) ? "block" : "none")}}>
                        {error?.getErrorMessage?.(name)}</span>
                    {disabled &&
                    <span className="text-muted small">
                        Tego pola nie możesz edytować, ponieważ zbiór został zakmnięty i rozdysponowany.
                        <span className="text-info btn-link" onClick={() => goToTank("id" in selected ? selected.id : '')}
                              style={{cursor: 'pointer', display: ("id" in selected && selected.id ? '' : 'none')}}>
                             Przejdź do Zarządzania zbiornikiem...
                        </span>
                        </span>
                    }
                </div>
            </FormGroup>
        </fieldset>
    )
};

export default SelectTank;