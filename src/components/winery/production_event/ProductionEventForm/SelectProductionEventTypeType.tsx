import React from 'react';
import {useProductionEventTypesReceiver} from "../../wine/service/useProductionEventTypesReceiver";
import {SelectType} from "../../../common/form-elements/SelectType";
import {SelectOptionProps} from "../../../common/form-elements/SelectType/SelectTypeModel";
import {ProductionEventType} from "../../wine/types/Wine";

export const SelectProductionEventType: React.FC<SelectOptionProps<ProductionEventType>> = ({
                                                                         value,
                                                                         onChange, name,
                                                                         label,
                                                                         optional,
                                                                         error
                                                                     }) => {

    return <SelectType onChange={onChange} name={name} receiver={useProductionEventTypesReceiver} error={error}
                       optional={optional} label={label} value={value}/>
};