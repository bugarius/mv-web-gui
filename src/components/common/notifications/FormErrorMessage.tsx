import React, {FC} from "react";
import {ServiceError} from "../../../services/types/Service";
import log from "loglevel";

interface Props {
    error: ServiceError;
    messageType?: 'details' | 'generalMessage' | 'fieldError';
    fieldName?: string;
}

export const FormErrorMessage: FC<Props> = ({error, messageType = 'generalMessage', fieldName}) => {

    log.debug("FormErrorMessage: ", error)

    const getMessage = (errorObj) => {
        switch (messageType)
        {
            case "details":
                return errorObj?.error?.details || errorObj?.error?.message;
            case "fieldError":
                return errorObj?.getErrorMessage?.(fieldName);
            default:
                return errorObj?.error?.message;
        }
    }

    const message = getMessage(error)

    return (
        <em className="error invalid-feedback"
            style={{display: (message ? 'block' : 'none')}}>{message}</em>
    )
}
