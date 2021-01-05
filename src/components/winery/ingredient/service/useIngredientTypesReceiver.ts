import {useEffect, useState} from "react";
import {SelectOption} from "../../../../services/types/SelectOption";
import {useTranslation} from "react-i18next";
import {IngredientType} from "../types/IngredientType";

const useIngredientTypesReceiver = (value?: IngredientType | SelectOption | null) => {

    const {t} = useTranslation();
    const options: SelectOption[] = Object.keys(IngredientType)
        .filter(i => typeof IngredientType[i] === "number")
        .map(i => ({value: i, label: t(`ingredients.TYPE.${i}`)}));
    const [selected, setSelected] = useState<SelectOption | string>('');

    useEffect(() => {
        if (value)
        {
            setSelected(value ? {value: value, label: t(`ingredients.TYPE.${value}`)} : '');
            return;
        }
    }, [value, t]);

    return {options, selected};
};


export default useIngredientTypesReceiver;