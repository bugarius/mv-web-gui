import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Tank} from "./types/Tank";
import {Error, Service, ServiceError, StatusType} from "../../../services/types/Service";
import {defaultError} from "../parcel/ParcelContext";
import {ResponseError} from "../../error/ResponseError";

interface TankContextInterface
{
    tank: Tank;
    setTank: (value: Tank) => void;
    updateTank: (name, value) => void;
    tanks: Tank[];
    setTanks: (value: Tank[]) => void;
    tankResult: Service<Tank>;
    setTankResult: (value: Service<Tank>) => void;
    setError: (value: Error) => void;
    error: ServiceError
}

const defaultTank = {
    id: null,
    number: "",
    capacity: null,
    liters: null,
    percentOfUsage: null,
};

const defaultState = {
    tank: defaultTank,
    setTank: () => {},
    updateTank: () => {},
    tanks: [],
    setTanks: () => {},
    tankResult: {status: StatusType.loading},
    setTankResult: () => {},
    setError: () => {},
    error: defaultError
};

const reducer = (state, action) => {
  switch (action.type)
  {
      case "reset":
          return defaultState;
      case "resetTank":
          return {...state, tank: defaultTank};
      case "resetTanks":
          return {...state, tanks: []};
      case "tank":
          return {...state, tank: {...action.value}};
      case "tanks":
          return {...state, tanks: [...action.value]};
      case "tankResult":
          return {...state, tankResult: {...action.value}};
      case "error":
          return {...state, error: action.value}

      default:
          return {...state, tank: {...state.tank, [action.type]: action.value}};
  }
};

const TankContext = React.createContext<TankContextInterface>(defaultState);
export const useTankContext = (): TankContextInterface => {
    return useContext(TankContext);
};

const TankProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(reducer, defaultState);

    const resetTank = useCallback(() => {
        dispatch({type: "resetTank", value: ''});
    }, []);

    const resetTanks = useCallback(() => {
        dispatch({type: "resetTanks", value: ''});
    }, []);

    const setTank = useCallback(tank => {
        dispatch({type: "tank", value: tank});
    }, []);

    const setTanks = useCallback(tanks => {
        dispatch({type: "tanks", value: tanks});
    }, []);

    const updateTank = useCallback((name, value) => {
        dispatch({type: name, value});
    }, []);

    const setTankResult = useCallback(result => {
        dispatch({type: "tankResult", value: result});
        if (result?.payload ) dispatch({type: "tank", value: result.payload});
    }, []);

    const setError = useCallback((error) => {
        dispatch({type: "error", value: new ResponseError(error)})
    }, []);

    const providerValue = useMemo(() => ({
        tank: state.tank,
        updateTank,
        tanks: state.tanks,
        setTank,
        setTanks,
        resetTank,
        resetTanks,
        tankResult: state.tankResult,
        setTankResult,
        setError,
        error: state.error

    }), [state.tank, updateTank, state.tanks, setTank, setTanks, resetTank, resetTanks, state.tankResult, setTankResult,
        setError, state.error]);

    return (
        <TankContext.Provider value={providerValue}>
            {children}
        </TankContext.Provider>
    )
};

export default TankProvider;