import React, {FC} from "react";
import {ServiceError} from "../../../services/types/Service";

export const FormErrorMessage: FC<{error: ServiceError}> = ({error}) => {
    return (
        <em className="error invalid-feedback"
            style={{display: (error?.error?.message ? 'block' : 'none')}}>{error?.error?.message}</em>
    )
}
