import React, {ChangeEvent} from 'react';
import {SelectOption} from "../../../../services/types/SelectOption";
import {IngredientType} from "../types/IngredientType";
import useIngredientTypesReceiver from "../service/useIngredientTypesReceiver";
import {ServiceError} from "../../../../services/types/Service";
import {SelectType} from "../../../common/form-elements/SelectType";

interface Props
{
    value?: IngredientType | SelectOption | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label?: string;
    optional?: boolean;
    error?: ServiceError;
    disabled?: boolean;
}

const SelectIngredientType: React.FC<Props> = ({
                                                   value,
                                                   onChange, name,
                                                   label,
                                                   optional,
                                                   error,
                                                   disabled
                                               }) => {

    return <SelectType onChange={onChange} name={name} receiver={useIngredientTypesReceiver} error={error}
                       optional={optional} label={label} value={value} disabled={disabled}/>
};

export default SelectIngredientType;