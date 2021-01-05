import React, {ChangeEvent} from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import {SelectOption} from "../../../../services/types/SelectOption";
import {Ingredient} from "../types/Ingredient";
import useIngredientsReceiver from "../service/useIngredientsReceiver";
import {IngredientType} from "../types/IngredientType";
import PageWrapper from "../../../common/PageWrapper";

interface Props
{
    value?: Ingredient | SelectOption | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: IngredientType | null;
    name: string;
    label?: string;
    optional?: boolean;
    showErrors?: boolean;
    errorMessage?: string;
}

const SelectIngredient: React.FC<Props> = ({
                                               value: selected,
                                               onChange, type,
                                               name,
                                               label,
                                               optional,
                                               showErrors,
                                               errorMessage}) => {

    const {selected: value, options: ingredients, loading} = useIngredientsReceiver(selected, type);

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
                    <PageWrapper loading={loading} disabled>
                        <Select name={name}
                                options={ingredients}
                                onChange={onChange}
                                value={value}
                                placeholder={"Wybierz"}
                                styles={showErrors && customStyles}
                        />
                        <span className="invalid-feedback"
                              style={{display: (showErrors ? "block" : "none")}}>{errorMessage}</span>
                    </PageWrapper>
                </div>
            </FormGroup>
        </fieldset>
    )
};

export default SelectIngredient;