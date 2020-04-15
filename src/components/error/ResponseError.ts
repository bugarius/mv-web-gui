import {Error, ServiceError, StatusType} from "../../services/types/Service";

export class ResponseError<T> implements ServiceError<T>
{
    status;
    error: Error;

    constructor(error)
    {
        this.status = StatusType.error;
        this.error = error;
    }

    hasError = (name: string) => {
        if (this.error?.errors)
        {
            return Object.keys(this.error?.errors).some(e => e === name)
        }
        return false;
    }
}