import React, {ChangeEvent, FC} from "react";
import {SelectOption} from "../../../../../services/types/SelectOption";
import {ServiceError} from "../../../../../services/types/Service";
import {SelectType} from "../../../../common/form-elements/SelectType";
import {WineStatus} from "../../types/Wine";
import {useWineStatusesReceiver} from "../../../ingredient/service/useWineStatusReceiver";

interface Props
{
    value?: WineStatus | SelectOption | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label?: string;
    optional?: boolean;
    error?: ServiceError;
}

export const SelectWineStatus: FC<Props> = ({
                                                         value,
                                                         onChange, name,
                                                         label,
                                                         optional,
                                                         error
                                                     }) => {
    return <SelectType onChange={onChange} name={name} receiver={useWineStatusesReceiver} error={error}
                       optional={optional} label={label} value={value}/>
};