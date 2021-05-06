import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Parcel} from "./types/Parcel";
import {Error, Service, ServiceError, StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../error/ResponseError";

interface ParcelContextInterface
{
    parcel: Parcel;
    setParcel: (value: Parcel) => void;
    updateParcel: (name, value) => void;
    parcels: Parcel[];
    setParcels: (value: Parcel[]) => void;
    parcelResult: Service<Parcel>;
    setParcelResult: (value: Service<Parcel>) => void;
    setError: (value: Error) => void;
    error: ServiceError
}

const defaultParcel = {
    id: null,
    country: "",
    city: "",
    zipCode: "",
    district: "",
    area: null,
    registrationNumber: "",
    liveStatus: undefined
};

export const defaultError = {
    status: StatusType.error,
    error: {
        message: "",
        errors: {},
        details: ""
    },
    hasError: () => false,
    getErrorMessage: () => ""
}

const defaultState = {
    parcel: defaultParcel,
    setParcel: () => {},
    updateParcel: () => {},
    parcels: [],
    setParcels: () => {},
    parcelResult: {status: StatusType.loading},
    setParcelResult: () => {},
    setError: () => {},
    error: defaultError
};

const reducer = (state, action) => {
  switch (action.type)
  {
      case "reset":
          return defaultState;
      case "resetParcel":
          return {...state, parcel: defaultParcel};
      case "resetParcels":
          return {...state, parcels: []};
      case "parcel":
          return {...state, parcel: {...action.value}};
      case "parcels":
          return {...state, parcels: [...action.value]};
      case "parcelResult":
          return {...state, parcelResult: {...action.value}};
      case "error":
          return {...state, error: action.value}

      default:
          return {...state, parcel: {...state.parcel, [action.type]: action.value}};
  }
};

const ParcelContext = React.createContext<ParcelContextInterface>(defaultState);
export const useParcelContext = (): ParcelContextInterface => {
    return useContext(ParcelContext);
};

const ParcelProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(reducer, defaultState);

    const resetParcel = useCallback(() => {
        dispatch({type: "resetParcel", value: ''});
    }, []);

    const resetParcels = useCallback(() => {
        dispatch({type: "resetParcels", value: ''});
    }, []);

    const setParcel = useCallback(parcel => {
        dispatch({type: "parcel", value: parcel});
    }, []);

    const setParcels = useCallback(parcels => {
        dispatch({type: "parcels", value: parcels});
    }, []);

    const updateParcel = useCallback((name, value) => {
        dispatch({type: name, value});
    }, []);

    const setParcelResult = useCallback(result => {
        dispatch({type: "parcelResult", value: result});
        if (result?.payload ) dispatch({type: "parcel", value: result.payload});
    }, []);

    const setError = useCallback((error) => {
        dispatch({type: "error", value: new ResponseError(error)})
    }, []);

    const providerValue = useMemo(() => ({
        parcel: state.parcel,
        updateParcel,
        parcels: state.parcels,
        setParcel,
        setParcels,
        resetParcel,
        resetParcels,
        parcelResult: state.parcelResult,
        setParcelResult,
        setError,
        error: state.error

    }), [state.parcel, updateParcel, state.parcels, setParcel, setParcels, resetParcel, resetParcels, state.parcelResult,
        setParcelResult, setError, state.error]);

    return (
        <ParcelContext.Provider value={providerValue}>
            {children}
        </ParcelContext.Provider>
    )
};

export default ParcelProvider;