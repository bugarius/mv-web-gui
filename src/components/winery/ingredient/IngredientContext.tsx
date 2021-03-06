import React, {useCallback, useContext, useMemo, useReducer} from 'react';
import {Ingredient} from "./types/Ingredient";
import {Error, Service, ServiceError, StatusType} from "../../../services/types/Service";
import {defaultError} from "../parcel/ParcelContext";
import {ResponseError} from "../../error/ResponseError";

interface IngredientContextInterface
{
  ingredient: Ingredient;
  setIngredient: (value: Ingredient) => void;
  updateIngredient: (name, value) => void;
  ingredients: Ingredient[];
  setIngredients: (value: Ingredient[]) => void;
  ingredientResult: Service<Ingredient>;
  setIngredientResult: (value: Service<Ingredient>) => void;
  loading;
  setError: (value: Error) => void;
  error: ServiceError
}

const defaultIngredient = {
  id: null,
  ingredient: null,
  name: "",
  info: "",
  type: null,
  amount: null,
  notes: "",
  // picture: {},
  appliedDate: "",
  liveStatus: undefined
};

const defaultState = {
  ingredient: defaultIngredient,
  setIngredient: () => {},
  updateIngredient: () => {},
  ingredients: [],
  setIngredients: () => {},
  ingredientResult: {status: StatusType.loading},
  setIngredientResult: () => {},
  loading: false,
  setError: () => {},
  error: defaultError
};

const reducer = (state, action) => {
  switch (action.type)
  {
    case "reset":
      return defaultState;
    case "resetIngredient":
      return {...state, ingredient: defaultIngredient};
    case "resetIngredients":
      return {...state, ingredients: []};
    case "setIngredient":
      return {...state, ingredient: {...action.value}};
    case "ingredients":
      return {...state, ingredients: [...action.value]};
    case "ingredientResult":
      return {...state, ingredientResult: {...action.value}};
    case "error":
      return {...state, error: action.value}

    default:
      return {...state, ingredient: {...state.ingredient, [action.type]: action.value}};
  }
};

const IngredientContext = React.createContext<IngredientContextInterface>(defaultState);
export const useIngredientContext = (): IngredientContextInterface => {
  return useContext(IngredientContext);
};

const IngredientProvider: React.FC = ({children}) => {

  const [state, dispatch] = useReducer(reducer, defaultState);

  const resetIngredient = useCallback(() => {
    dispatch({type: "resetIngredient", value: ''});
  }, []);

  const resetIngredients = useCallback(() => {
    dispatch({type: "resetIngredients", value: ''});
  }, []);

  const setIngredient = useCallback(ingredient => {
    dispatch({type: "setIngredient", value: ingredient});
  }, []);

  const setIngredients = useCallback(ingredients => {
    dispatch({type: "ingredients", value: ingredients});
  }, []);

  const updateIngredient = useCallback((name, value) => {
    dispatch({type: name, value});
  }, []);

  const setIngredientResult = useCallback(result => {
    dispatch({type: "ingredientResult", value: result});
    if (result?.payload ) dispatch({type: "setIngredient", value: result.payload});
  }, []);

  const setError = useCallback((error) => {
    dispatch({type: "error", value: new ResponseError(error)})
  }, []);

  const providerValue = useMemo(() => ({
    ingredient: state.ingredient,
    updateIngredient,
    ingredients: state.ingredients,
    setIngredient,
    setIngredients,
    resetIngredient,
    resetIngredients,
    ingredientResult: state.ingredientResult,
    setIngredientResult,
    loading: state.ingredientResult.status === StatusType.loading,
    setError,
    error: state.error

  }), [state.ingredient, updateIngredient, state.ingredients, setIngredient, setIngredients, resetIngredient,
    resetIngredients, state.ingredientResult, setIngredientResult, setError, state.error]);

  return (
          <IngredientContext.Provider value={providerValue}>
            {children}
          </IngredientContext.Provider>
  )
};

export default IngredientProvider;