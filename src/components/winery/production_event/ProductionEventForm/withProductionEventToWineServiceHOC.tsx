import React, {ChangeEvent, useEffect, useState} from "react";
import {ProductionEvent} from "../../wine/types/Wine";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {useProductionEventContext} from "../ProductionEventContext";
import log from "loglevel";
import {ResponseError} from "../../../error/ResponseError";
import useWineService from "../../wine/service/useWineService";
import {useWineContext} from "../../wine/WineContext";

export interface EventToWineProps
{
    loading: boolean;
    event: ProductionEvent;
    onChange: () => void;
    updateTypeSelect: () => void;
    onSubmit: () => void;
    error: ServiceError;
    newKey: string;
}

export const withProductionEventToWineServiceHOC = <EventToWineProps, >(WrappedComponent: React.ComponentType<EventToWineProps>) => (props) => {

    const {
        productionEvent: event,
        productionEventResult: result,
        setProductionEventResult: setResult,
        updateProductionEvent: update
    } = useProductionEventContext();

    const {setWineResult} = useWineContext();

    const [key, setKey] = useState(new Date());

    const service = useWineService();

    useEffect(() => {
        setResult({status: StatusType.loaded})
    }, [setResult])

    const handleOnChange = (e: ChangeEvent<HTMLButtonElement>) => {
        update(e.target.name, e.target.value);
    };

    const handleUpdateTypeSelect = (selected) => {
        update('type', selected.value);
    };

    const handleOnSubmit = (e) => {
        console.log(event)
        e.preventDefault();
        setResult({status: StatusType.loading});
        service.addEvent(event)
            .then(response => {
                setResult({status: StatusType.loaded});
                setWineResult({status: StatusType.loaded, payload: response});
                setKey(new Date());
            })
            .catch(response => {
                log.debug(response);
                setWineResult({status: StatusType.loaded});
                setResult(new ResponseError<ProductionEvent>(response) as ServiceError);
            });
        update("reset", "");
    };

    const error = result as ServiceError;

    const newProps = {
        ...props,
        loading: result.status === StatusType.loading,
        event: event,
        onChange: handleOnChange,
        updateTypeSelect: handleUpdateTypeSelect,
        onSubmit: handleOnSubmit,
        error,
        newKey: key
    }

    return <WrappedComponent {...newProps} />
}