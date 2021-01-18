import React, {useEffect} from "react";
import {ProductionEvent} from "../../wine/types/Wine";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {useProductionEventContext} from "../ProductionEventContext";
import {ResponseError} from "../../../error/ResponseError";
import {useParams} from "react-router-dom";
import {useProductionEventService} from "../service/useProductionEventService";
import {useProductionEventOnClickService} from "../service/useProductionEventOnClickService";

export interface EventToWineProps
{
    event: ProductionEvent;
    onChange: () => void;
    updateTypeSelect: () => void;
    onSubmit: () => void;
    error: ServiceError;
    newKey?: string;
}

export const withProductionEventToWineServiceHOC = <EventToWineProps, >(WrappedComponent: React.ComponentType<EventToWineProps>) => (props) => {

    const {
        productionEvent: event,
        productionEventResult: result,
        setProductionEventResult: setResult,
    } = useProductionEventContext();

    const {productionEventId} = useParams();

    const {onChange, updateTypeSelect, saveOnSubmit, updateOnSubmit, key} = useProductionEventOnClickService();

    const onSubmit = productionEventId ? updateOnSubmit : saveOnSubmit;

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

    const error = result as ServiceError;

    const newProps = {
        ...props,
        loading: result.status === StatusType.loading,
        event: event,
        onChange,
        updateTypeSelect,
        onSubmit,
        error,
        newKey: key
    }

    return <WrappedComponent {...newProps} />
}