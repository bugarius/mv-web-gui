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
    onChange: () => void;
    name: string;
    label?: string;
    optional?: boolean;
}

const SelectIngredientType: React.FC<Props> = ({value: selected, onChange, name, label, optional}) => {

    const {options, selected: value} = useIngredientTypesReceiver(selected);

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
                            placeholder={"Wybierz"}/>
                    <span className="invalid-feedback">Field is required</span>
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