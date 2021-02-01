import {ChangeEvent} from "react";
import {ToApiConverter} from "../../../services/Converters";

export const useEventHandlerActions = (update: (name: string, value: string | Date | Record<string, string>) => void) => {
    const onChange = (e: ChangeEvent<HTMLButtonElement>) => {
        update(e.target.name, e.target.value);
    };

    const updateSelect = (selectName: string, selected) => {
       update(selectName, selected.value);
    };

    const updateDate = (dateName: string, date: Date) => {
        update(dateName, ToApiConverter.convertDate(date));
    };

    const updateDateTime = (dateName: string, date: Date) => {
        update(dateName, date);
    };

    const updateEntitySelect = (entityName: string, selected: {value: string, label: string}) => {
        const entity = {id: selected.value, label: selected.label};
        update(entityName, entity);
    };

    return {onChange, updateSelect, updateDateTime, updateDate, updateEntitySelect}
};