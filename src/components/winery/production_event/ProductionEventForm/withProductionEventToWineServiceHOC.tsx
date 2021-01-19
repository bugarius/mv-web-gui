import React from "react";
import {ProductionEvent} from "../../wine/types/Wine";
import {ServiceError} from "../../../../services/types/Service";
import {useProductionEventOnClickService} from "../service/useProductionEventOnClickService";
import {useGetProductionEvent} from "../service/useGetProductionEvent";

export interface EventToWineProps
{
    event: ProductionEvent;
    actions: {
        onChange: () => void;
        updateTypeSelect: () => void;
        onSubmit: {
            update: (e: MouseEvent) => void;
            save: (e: MouseEvent) => void;
        };
        key?: string;
    }
    error: ServiceError;
}

export const withProductionEventToWineServiceHOC = <EventToWineProps, >(WrappedComponent: React.ComponentType<EventToWineProps>) => (props) => {

    const {event, loading, error} = useGetProductionEvent();
    const actions = useProductionEventOnClickService();

    const newProps = {
        ...props,
        loading,
        event: event,
        error,
        actions
    }

    return <WrappedComponent {...newProps} />
}