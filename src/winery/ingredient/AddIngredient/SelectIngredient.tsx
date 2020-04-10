import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../services/types/SelectOption";
import * as PropTypes from "prop-types";
import {Ingredient} from "../types/Ingredient";
import useIngredientsReceiver from "../service/useIngredientsReceiver";
import {IngredientType} from "../types/IngredientType";
import PageWrapper from "../../../common/PageWrapper";

interface Props
{
    value: Ingredient | SelectOption;
    onChange: () => void;
    type?: IngredientType;
    name: string;
    label?: string;
    optional?: boolean;
}

const SelectIngredient: React.FC<Props> = ({value: selected, onChange, type, name, label, optional}) => {

    const {selected: value, options: ingredients, loading} = useIngredientsReceiver(selected, type);

    return (
        <fieldset>
            <FormGroup row>
                <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                    <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                </label>
                <div className="col-md-10">
                    <PageWrapper loading={loading} disabled>
                        <Select name={name}
                                options={ingredients}
                                onChange={onChange}
                                value={value}
                                placeholder={"Wybierz"}/>
                        <span className="invalid-feedback">Field is required</span>
                    </PageWrapper>
                </div>
            </FormGroup>
        </fieldset>
    )
};

SelectIngredient.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.oneOfType([PropTypes.oneOf(Object.values(IngredientType)), PropTypes.any]),
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    optional: PropTypes.bool
};

export default SelectIngredient;