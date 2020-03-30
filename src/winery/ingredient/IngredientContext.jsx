import React, {useMemo, useState} from 'react';

export const IngredientContext = React.createContext();

export const IngredientProvider = ({children}) => {

  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showErrors, setShowErrors] = useState(false);

  const updateIngredient = (key, value) => {
    console.log("IngredientContext::updateIngredient", key, value);
    setIngredient(ingredient => ({...ingredient, [key]: value}));
  };

  const actions = {setIngredient, updateIngredient, setLoading, setShowErrors};

  const providerValue = useMemo(() => ({ingredient, actions, loading, showErrors}), [ingredient, actions, loading, showErrors]);

    return (
      <IngredientContext.Provider value={providerValue}>
        {children}
      </IngredientContext.Provider>
    )
};