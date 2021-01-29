import React, {FC} from 'react';

import DatePicker from "react-datepicker";
import {ServiceError} from "../../../../services/types/Service";
import {useTranslation} from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/input_date_style.css"

export interface InputDateProps
{
    name: string;
    maxDate?: Date;
    minDate?: Date;
    defaultValue?: Date | string | number | null;
    onChange: (name: string, date: string) => void;
    disabled?: boolean;
    error?: ServiceError,
    showTimeInput?: boolean;
    showTimeSelect?: boolean;
}

export const InputElementDateItem: FC<InputDateProps> = ({
                                                             name,
                                                             maxDate,
                                                             minDate,
                                                             defaultValue,
                                                             onChange,
                                                             error,
                                                             disabled,
                                                             showTimeInput,
                                                             showTimeSelect
                                                         }) => {

        const {t} = useTranslation();

        return (
            <div className="col-md-10">
                <DatePicker
                    selected={defaultValue ? new Date(defaultValue) : ""}
                    onChange={(date) => onChange(name, date)}
                    timeInputLabel={`${t('common.TIME')}:`}
                    dateFormat="dd.MM.yyyy HH:mm"
                    showTimeSelect={showTimeSelect}
                    timeFormat="HH:mm"
                    timeCaption={t('common.TIME')}
                    showTimeInput={showTimeInput}
                    timeIntervals={15}
                    disabled={disabled}
                    minDate={minDate}
                    maxDate={maxDate}
                    className={'form-control ' + (error?.hasError?.(name) ? "border-danger" : "")}

                />
                <span className="invalid-feedback" style={{display: (error?.hasError?.(name) ? "block" : "none")}}>
                    {error?.getErrorMessage?.(name)}</span>
            </div>

        );

    }
;
