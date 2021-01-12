import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Service, StatusType} from "../../../services/types/Service";
import {ProductionEvent} from "../wine/types/Wine";


interface ProductionEventContextInterface
{
    productionEvent: ProductionEvent;
    setProductionEvent: (value: ProductionEvent) => void;
    updateProductionEvent: (name, value) => void;
    productionEvents: ProductionEvent[];
    setProductionEvents: (value: ProductionEvent[]) => void;
    productionEventResult: Service<ProductionEvent>;
    setProductionEventResult: (value: Service<ProductionEvent>) => void;
    loading: boolean;
}

const defaultProductionEvent = {
    id: null,
    name: "",
    type: null,
    info: "",
    startingDate: "",
    endingDate: "",
    waste: null
};

const defaultState = {
    productionEvent: defaultProductionEvent,
    setProductionEvent: () => {
    },
    updateProductionEvent: () => {
    },
    productionEvents: [],
    setProductionEvents: () => {
    },
    productionEventResult: {status: StatusType.loading},
    setProductionEventResult: () => {
    },
    loading: false
};

const reducer = (state, action) => {
    switch (action.type)
    {
        case "reset":
            return defaultState;
        case "resetProductionEvent":
            return {...state, productionEvent: defaultProductionEvent};
        case "resetProductionEvents":
            return {...state, productionEvents: []};
        case "setProductionEvent":
            return {...state, productionEvent: {...action.value}};
        case "productionEvents":
            return {...state, productionEvents: [...action.value]};
        case "productionEventResult":
            return {...state, productionEventResult: {...action.value}};

        default:
            return {...state, productionEvent: {...state.productionEvent, [action.type]: action.value}};
    }
};

const ProductionEventContext = React.createContext<ProductionEventContextInterface>(defaultState);
export const useProductionEventContext = (): ProductionEventContextInterface => {
    return useContext(ProductionEventContext);
};

const ProductionEventProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(reducer, defaultState);

    const resetProductionEvent = useCallback(() => {
        dispatch({type: "resetProductionEvent", value: ''});
    }, []);

    const resetProductionEvents = useCallback(() => {
        dispatch({type: "resetProductionEvents", value: ''});
    }, []);

    const setProductionEvent = useCallback(productionEvent => {
        dispatch({type: "setProductionEvent", value: productionEvent});
    }, []);

    const setProductionEvents = useCallback(productionEvents => {
        dispatch({type: "productionEvents", value: productionEvents});
    }, []);

    const updateProductionEvent = useCallback((name, value) => {
        dispatch({type: name, value});
    }, []);

    const setProductionEventResult = useCallback(result => {
        dispatch({type: "productionEventResult", value: result});
        if (result?.payload)
        {
            dispatch({type: "setProductionEvent", value: result.payload});
        }
    }, []);

    const providerValue = useMemo(() => ({
        productionEvent: state.productionEvent,
        updateProductionEvent,
        productionEvents: state.productionEvents,
        setProductionEvent,
        setProductionEvents,
        resetProductionEvent,
        resetProductionEvents,
        productionEventResult: state.productionEventResult,
        setProductionEventResult,
        loading: state.productionEventResult.status === StatusType.loading

    }), [state.productionEvent, updateProductionEvent, state.productionEvents, setProductionEvent, setProductionEvents, resetProductionEvent, resetProductionEvents, state.productionEventResult, setProductionEventResult]);

    return (
        <ProductionEventContext.Provider value={providerValue}>
            {children}
        </ProductionEventContext.Provider>
    )
};

export default ProductionEventProvider;