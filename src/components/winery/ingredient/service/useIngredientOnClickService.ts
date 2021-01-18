import {ChangeEvent} from "react";
import {useIngredientContext} from "../IngredientContext";

export const useIngredientOnClickService = () => {

    const {updateIngredient} = useIngredientContext();

    const updateIngredientSelect = (selected) => {
        updateIngredient('ingredient', {...selected, id: selected.value, label: selected.label});
        updateIngredient('type', selected.type);
    };

    const updateTypeSelect = (selected) => {
        updateIngredient('type', selected.value);
        updateIngredient('ingredient', {});
    };

    const onChange = (e: ChangeEvent<HTMLButtonElement>) => {
        updateIngredient(e.target.name, e.target.value);
    };

    return {updateIngredientSelect, updateTypeSelect, onChange}
}