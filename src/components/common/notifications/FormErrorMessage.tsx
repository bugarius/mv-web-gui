import React, {FC} from "react";
import {ServiceError} from "../../../services/types/Service";
import log from "loglevel";

export const FormErrorMessage: FC<{error: ServiceError}> = ({error}) => {

    log.debug("FormErrorMessage: ", error)
    const message = error?.error?.message ? error?.error?.message : error?.error?.details;
    return (
        <em className="error invalid-feedback"
            style={{display: (message ? 'block' : 'none')}}>{message}</em>
    )
}
