import {useEffect, useState} from "react";
import {SelectOption} from "../../../../services/types/SelectOption";
import {useTranslation} from "react-i18next";
import {WineStatus} from "../types/Wine";

export const useWineStatusesReceiver = (value?: WineStatus | SelectOption | null) => {

    const {t} = useTranslation();
    const options: SelectOption[] = Object.keys(WineStatus)
        .filter(i => typeof WineStatus[i] === "number")
        .map(i => ({value: i, label: t(`wine.status.${i}`)}));
    const [selected, setSelected] = useState<SelectOption | string>('');

    useEffect(() => {
        if (value)
        {
            setSelected(value ? {value: value, label: t(`wine.status.${value}`)} : '');
            return;
        }
    }, [value, t]);

    return {options, selected};
};