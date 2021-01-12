import React, {FC} from "react";
import {ServiceError} from "../../../services/types/Service";

export const FormErrorMessage: FC<{error: ServiceError}> = ({error}) => {
    console.log(error)
    return (
        <em className="error invalid-feedback"
            style={{display: (error?.error?.details ? 'block' : 'none')}}>{error?.error?.details}</em>
    )
}
