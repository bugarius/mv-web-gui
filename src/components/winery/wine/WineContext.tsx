import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Wine} from "./types/Wine";
import {Error, Service, ServiceError, StatusType} from "../../../services/types/Service";
import {defaultError} from "../parcel/ParcelContext";
import {ResponseError} from "../../error/ResponseError";

interface WineContextInterface
{
  wine: Wine;
  setWine: (value: Wine) => void;
  updateWine: (name, value) => void;
  wines: Wine[];
  setWines: (value: Wine[]) => void;
  wineResult: Service<Wine>;
  setWineResult: (value: Service<Wine>) => void;
  loading: boolean,
  setError: (value: Error) => void;
  error: ServiceError
}

const defaultWine = {
  id: null,
  name: "",
  tank: null,
  startDate: "",
  liters: null,
  harvest: null,
  ingredients: [],
  history: [],
  status: null,
  events: [],
  lastEvent: null
};

const defaultState = {
  wine: defaultWine,
  setWine: () => {},
  updateWine: () => {},
  wines: [],
  setWines: () => {},
  wineResult: {status: StatusType.loading},
  setWineResult: () => {},
  loading: false,
  setError: () => {},
  error: defaultError
};

const reducer = (state, action) => {
  switch (action.type)
  {
    case "reset":
      return defaultState;
    case "resetWine":
      return {...state, wine: defaultWine};
    case "resetWines":
      return {...state, wines: []};
    case "wine":
      return {...state, wine: {...action.value}};
    case "wines":
      return {...state, wines: [...action.value]};
    case "wineResult":
      return {...state, wineResult: {...action.value}};
    case "error":
      return {...state, error: action.value}

    default:
      return {...state, wine: {...state.wine, [action.type]: action.value}};
  }
};

export const WineContext = React.createContext<WineContextInterface>(defaultState);
export const useWineContext = (): WineContextInterface => {
  return useContext(WineContext);
};

const WineProvider: React.FC = ({children}) => {

  const [state, dispatch] = useReducer(reducer, defaultState);

  const resetWine = useCallback(() => {
    dispatch({type: "resetWine", value: ''});
  }, []);

  const resetWines = useCallback(() => {
    dispatch({type: "resetWines", value: ''});
  }, []);

  const setWine = useCallback(wine => {
    dispatch({type: "wine", value: wine});
  }, []);

  const setWines = useCallback(wines => {
    dispatch({type: "wines", value: wines});
  }, []);

  const updateWine = useCallback((name, value) => {
    dispatch({type: name, value});
  }, []);

  const setWineResult = useCallback(result => {
    dispatch({type: "wineResult", value: result});
    if (result?.payload ) {
      dispatch({type: "wine", value: result.payload});
    }
  }, []);

  const setError = useCallback((error) => {
    dispatch({type: "error", value: new ResponseError(error)})
  }, []);

  const providerValue = useMemo(() => ({
    wine: state.wine,
    updateWine,
    wines: state.wines,
    setWine,
    setWines,
    resetWine,
    resetWines,
    wineResult: state.wineResult,
    setWineResult,
    loading: state.wineResult.status === StatusType.loading,
    setError,
    error: state.error

  }), [state.wine, updateWine, state.wines, setWine, setWines, resetWine, resetWines, state.wineResult, setWineResult,
    setError, state.error]);

  return (
      <WineContext.Provider value={providerValue}>
        {children}
      </WineContext.Provider>
  )
};

export default WineProvider;