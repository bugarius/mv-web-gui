import React, {ChangeEvent} from 'react';
import {ProductionEventType} from "../../wine/types/Wine";
import {useProductionEventTypesReceiver} from "../../wine/service/useProductionEventTypesReceiver";
import {SelectOption} from "../../../../services/types/SelectOption";
import {ServiceError} from "../../../../services/types/Service";
import {SelectType} from "../../../common/form-elements/SelectType";

interface Props
{
    value?: ProductionEventType | SelectOption | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label?: string;
    optional?: boolean;
    error?: ServiceError;
}

export const SelectProductionEventType: React.FC<Props> = ({
                                                               value,
                                                               onChange, name,
                                                               label,
                                                               optional,
                                                               error
                                                           }) => {

    return <SelectType onChange={onChange} name={name} receiver={useProductionEventTypesReceiver} error={error}
                       optional={optional} label={label} value={value}/>
};