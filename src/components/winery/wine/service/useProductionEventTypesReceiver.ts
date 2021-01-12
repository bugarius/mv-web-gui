import {useEffect, useState} from "react";
import {SelectOption} from "../../../../services/types/SelectOption";
import {useTranslation} from "react-i18next";
import {ProductionEventType} from "../types/Wine";

export const useProductionEventTypesReceiver = (value?: ProductionEventType | SelectOption | null) => {

    const {t} = useTranslation();
    const options: SelectOption[] = Object.keys(ProductionEventType)
        .filter(i => typeof ProductionEventType[i] === "number")
        .map(i => ({value: i, label: t(`event.type.${i}`)}));
    const [selected, setSelected] = useState<SelectOption | string>('');

    useEffect(() => {
        if (value)
        {
            setSelected(value ? {value: value, label: t(`event.type.${value}`)} : '');
            return;
        }
    }, [value, t]);

    return {options, selected};
};