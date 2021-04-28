import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Grapevine} from "./types/Grapevine";
import {Error, Service, ServiceError, StatusType} from "../../../services/types/Service";
import {defaultError} from "../parcel/ParcelContext";
import {ResponseError} from "../../error/ResponseError";

interface GrapevineContextInterface
{
  grapevine: Grapevine;
  setGrapevine: (value: Grapevine) => void;
  updateGrapevine: (name, value) => void;
  grapevines: Grapevine[];
  setGrapevines: (value: Grapevine[]) => void;
  grapevineResult: Service<Grapevine>;
  setGrapevineResult: (value: Service<Grapevine>) => void;
  setError: (value: Error) => void;
  error: ServiceError
}

const defaultGrapevine = {
  id: null,
  name: "",
  numberOfPlants: null,
  area: null,
  parcels: [],
  yearOfPlanting: "",
  grapeColor: null,
  // picture: {},
};

const defaultState = {
  grapevine: defaultGrapevine,
  setGrapevine: () => {},
  updateGrapevine: () => {},
  grapevines: [],
  setGrapevines: () => {},
  grapevineResult: {status: StatusType.loading},
  setGrapevineResult: () => {},
  setError: () => {},
  error: defaultError
};

const reducer = (state, action) => {
  switch (action.type)
  {
    case "reset":
      return defaultState;
    case "resetGrapevine":
      return {...state, grapevine: defaultGrapevine};
    case "resetGrapevines":
      return {...state, grapevines: []};
    case "grapevine":
      return {...state, grapevine: {...action.value}};
    case "grapevines":
      return {...state, grapevines: [...action.value]};
    case "grapevineResult":
      return {...state, grapevineResult: {...action.value}};
    case "error":
      return {...state, error: action.value}

    default:
      return {...state, grapevine: {...state.grapevine, [action.type]: action.value}};
  }
};

const GrapevineContext = React.createContext<GrapevineContextInterface>(defaultState);
export const useGrapevineContext = (): GrapevineContextInterface => {
  return useContext(GrapevineContext);
};

const GrapevineProvider: React.FC = ({children}) => {

  const [state, dispatch] = useReducer(reducer, defaultState);

  const resetGrapevine = useCallback(() => {
    dispatch({type: "resetGrapevine", value: ''});
  }, []);

  const resetGrapevines = useCallback(() => {
    dispatch({type: "resetGrapevines", value: ''});
  }, []);

  const setGrapevine = useCallback(grapevine => {
    dispatch({type: "grapevine", value: grapevine});
  }, []);

  const setGrapevines = useCallback(grapevines => {
    dispatch({type: "grapevines", value: grapevines});
  }, []);

  const updateGrapevine = useCallback((name, value) => {
    dispatch({type: name, value});
  }, []);

  const setGrapevineResult = useCallback(result => {
    dispatch({type: "grapevineResult", value: result});
    if (result?.payload ) dispatch({type: "grapevine", value: result.payload});
  }, []);

  const setError = useCallback((error) => {
    dispatch({type: "error", value: new ResponseError(error)})
  }, []);

  const providerValue = useMemo(() => ({
    grapevine: state.grapevine,
    updateGrapevine,
    grapevines: state.grapevines,
    setGrapevine,
    setGrapevines,
    resetGrapevine,
    resetGrapevines,
    grapevineResult: state.grapevineResult,
    setGrapevineResult,
    setError,
    error: state.error

  }), [state.grapevine, updateGrapevine, state.grapevines, setGrapevine, setGrapevines, resetGrapevine, resetGrapevines, state.grapevineResult, setGrapevineResult, setError, state.error]);

  return (
          <GrapevineContext.Provider value={providerValue}>
            {children}
          </GrapevineContext.Provider>
  )
};

export default GrapevineProvider;