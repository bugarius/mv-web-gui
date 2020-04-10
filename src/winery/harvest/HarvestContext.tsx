import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Harvest} from "./types/Harvest";
import {Service, StatusType} from "../../services/types/Service";

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
}

const defaultHarvest = {
    id: null,
    grapevine: {},
    dateOfHarvest: "",
    weightOfGrapes: null,
    amountOfMust: null,
    amountOfWaste: null,
    box: null,
    boxesCount: null,
    weightOfEveryEmptyBox: null,
    allDisposedToWine: false,
    history: []
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
    loading: false
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
        loading: state.harvestResult.status === StatusType.loading

    }), [state.harvest, updateHarvest, updateBox, state.harvests, setHarvest, setHarvests, resetHarvest,
        resetHarvests, state.harvestResult, setHarvestResult]);

    return (
        <HarvestContext.Provider value={providerValue}>
            {children}
        </HarvestContext.Provider>
    )
};

export default HarvestProvider;