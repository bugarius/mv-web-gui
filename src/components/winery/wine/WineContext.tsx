import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Wine} from "./types/Wine";
import {Service, StatusType} from "../../../services/types/Service";

interface WineContextInterface
{
  wine: Wine;
  setWine: (value: Wine) => void;
  updateWine: (name, value) => void;
  wines: Wine[];
  setWines: (value: Wine[]) => void;
  wineResult: Service<Wine>;
  setWineResult: (value: Service<Wine>) => void;
  loading: boolean
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
  events: []
};

const defaultState = {
  wine: defaultWine,
  setWine: () => {},
  updateWine: () => {},
  wines: [],
  setWines: () => {},
  wineResult: {status: StatusType.loading},
  setWineResult: () => {},
  loading: false
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
    if (result?.payload ) dispatch({type: "wine", value: result.payload});
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
    loading: state.wineResult.status === StatusType.loading

  }), [state.wine, updateWine, state.wines, setWine, setWines, resetWine, resetWines, state.wineResult, setWineResult]);

  return (
      <WineContext.Provider value={providerValue}>
        {children}
      </WineContext.Provider>
  )
};

export default WineProvider;