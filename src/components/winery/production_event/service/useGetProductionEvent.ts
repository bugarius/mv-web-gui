import {useEffect} from "react";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {useParams} from "react-router-dom";
import {ProductionEvent} from "../../wine/types/Wine";
import {useProductionEventContext} from "../ProductionEventContext";
import {useProductionEventService} from "./useProductionEventService";

interface ReturnProps
{
    event: ProductionEvent;
    error: ServiceError | undefined;
    loading: boolean;
}

export const useGetProductionEvent = (): ReturnProps  => {

    const {
        productionEvent: event,
        productionEventResult: result,
        setProductionEventResult: setResult,
        loading
    } = useProductionEventContext();

    const {productionEventId} = useParams();
    const eventService = useProductionEventService();

    useEffect(() => {
        if ((result.status === StatusType.loading) && productionEventId)
        {
            eventService.get(parseInt(productionEventId))
                .then(response => setResult({status: StatusType.loaded, payload: response}))
                .catch(response => setResult(new ResponseError<ProductionEvent>(response)));
        }
        else if (!productionEventId && result.status === StatusType.loading)
        {
            setResult({status: StatusType.loaded})
        }
    })

    const error = result?.status === StatusType.error ? result as ServiceError : undefined;

    return {event, error, loading}
};