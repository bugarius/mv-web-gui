import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../../services/types/SelectOption";
import * as PropTypes from "prop-types";
import {IngredientType} from "../types/IngredientType";
import useIngredientTypesReceiver from "../service/useIngredientTypesReceiver";

interface Props
{
    value?: IngredientType | SelectOption;
    onChange: (e: React.ChangeEvent) => void;
    name: string;
    label?: string;
    optional?: boolean;
    showErrors?: boolean;
    errorMessage?: string;
}

const SelectIngredientType: React.FC<Props> = ({
                                                   value: selected,
                                                   onChange, name,
                                                   label,
                                                   optional,
                                                   showErrors,
                                                   errorMessage
                                               }) => {

    const {options, selected: value} = useIngredientTypesReceiver(selected);

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
                            onChange={onChange}
                            value={value}
                            placeholder={"Wybierz"} styles={showErrors && customStyles}
                    />
                    <span className="invalid-feedback"
                          style={{display: (showErrors ? "block" : "none")}}>{errorMessage}</span>
                </div>
            </FormGroup>
        </fieldset>
    )
};

SelectIngredientType.propTypes = {
    value: PropTypes.oneOfType(
        [
            PropTypes.oneOf(Object.values(IngredientType)),
            PropTypes.oneOfType([PropTypes.any, PropTypes.string])
        ]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    optional: PropTypes.bool
};

export default SelectIngredientType;