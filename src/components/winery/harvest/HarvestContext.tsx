import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Harvest} from "./types/Harvest";
import {Error, Service, ServiceError, StatusType} from "../../../services/types/Service";
import {defaultError} from "../parcel/ParcelContext";
import {ResponseError} from "../../error/ResponseError";

interface HarvestContextInterface
{
    harvest: Harvest;
    setHarvest: (value: Harvest) => void;
    updateHarvest: (name, value) => void;
    updateBox: (name, value) => void;
    harvests: Harvest[];
    setHarvests: (value: Harvest[]) => void;
    harvestResult: Service<Harvest>;
    setHarvestResult: (value: Service<Harvest>) => void;
    loading: boolean;
    setError: (value: Error) => void;
    error: ServiceError
}

export const defaultHarvest = {
    id: null,
    grapevine: null,
    dateOfHarvest: "",
    weightOfGrapes: null,
    amountOfMust: null,
    amountOfWaste: null,
    box: {id: null, weightOfEmptyBox: null, weightOfFullBox: null},
    boxesCount: null,
    weightOfEveryEmptyBox: null,
    allDisposedToWine: false,
    history: [],
    liveStatus: undefined
};

const defaultState = {
    harvest: defaultHarvest,
    setHarvest: () => {},
    updateBox: () => {},
    updateHarvest: () => {},
    harvests: [],
    setHarvests: () => {},
    harvestResult: {status: StatusType.loading},
    setHarvestResult: () => {},
    loading: false,
    setError: () => {},
    error: defaultError
};

const reducer = (state, action) => {
    switch (action.type)
    {
        case "reset":
            return defaultState;
        case "resetHarvest":
            return {...state, harvest: defaultHarvest};
        case "resetHarvests":
            return {...state, harvests: []};
        case "harvest":
            return {...state, harvest: {...action.value}};
        case "harvests":
            return {...state, harvests: [...action.value]};
        case "harvestResult":
            return {...state, harvestResult: {...action.value}};
        case "box":
            return {...state, harvest: {...state.harvest, box: {...state.harvest.box, [action.value.name]: action.value.value}}};
        case "error":
            return {...state, error: action.value}

        default:
            return {...state, harvest: {...state.harvest, [action.type]: action.value}};
    }
};

export const HarvestContext = React.createContext<HarvestContextInterface>(defaultState);
export const useHarvestContext = (): HarvestContextInterface => {
    return useContext(HarvestContext);
};

const HarvestProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(reducer, defaultState);

    const resetHarvest = useCallback(() => {
        dispatch({type: "resetHarvest", value: ''});
    }, []);

    const resetHarvests = useCallback(() => {
        dispatch({type: "resetHarvests", value: ''});
    }, []);

    const setHarvest = useCallback(harvest => {
        dispatch({type: "harvest", value: harvest});
    }, []);

    const setHarvests = useCallback(harvests => {
        dispatch({type: "harvests", value: harvests});
    }, []);

    const updateHarvest = useCallback((name, value) => {
        dispatch({type: name, value});
    }, []);

    const updateBox = useCallback((name, value) => {
        dispatch({type: "box", value: {name, value}});
    }, []);

    const setHarvestResult = useCallback(result => {
        dispatch({type: "harvestResult", value: result});
        if (result?.payload)
        {
            dispatch({type: "harvest", value: result.payload});
        }
    }, []);

    const setError = useCallback((error) => {
        dispatch({type: "error", value: new ResponseError(error)})
    }, []);

    const providerValue = useMemo(() => ({
        harvest: state.harvest,
        updateHarvest,
        updateBox,
        harvests: state.harvests,
        setHarvest,
        setHarvests,
        resetHarvest,
        resetHarvests,
        harvestResult: state.harvestResult,
        setHarvestResult,
        loading: state.harvestResult.status === StatusType.loading,
        setError,
        error: state.error

    }), [state.harvest, updateHarvest, updateBox, state.harvests, setHarvest, setHarvests, resetHarvest,
        resetHarvests, state.harvestResult, setHarvestResult, setError, state.error]);

    return (
        <HarvestContext.Provider value={providerValue}>
            {children}
        </HarvestContext.Provider>
    )
};

export default HarvestProvider;