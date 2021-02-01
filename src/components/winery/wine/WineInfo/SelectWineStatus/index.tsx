import React, {FC} from "react";
import {SelectType} from "../../../../common/form-elements/SelectType";
import {useWineStatusesReceiver} from "../../service/useWineStatusReceiver";
import {SelectOptionProps} from "../../../../common/form-elements/SelectType/SelectTypeModel";
import {WineStatus} from "../../types/Wine";

export const SelectWineStatus: FC<SelectOptionProps<WineStatus>> = ({
                                                          value,
                                                          onChange, name,
                                                          label,
                                                          optional,
                                                          error
                                                      }) => {
    return <SelectType onChange={onChange} name={name} receiver={useWineStatusesReceiver} error={error}
                       optional={optional} label={label} value={value}/>
};