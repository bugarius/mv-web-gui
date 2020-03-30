import React, {useMemo, useState} from 'react';

export const WineContext = React.createContext();

export const WineProvider = ({children}) => {

  const [wine, setWine] = useState({});
  const [loading, setLoading] = useState(true);
  const [showErrors, setShowErrors] = useState(false);

  const updateWine = (key, value) => {
    console.log("WineContext::updateWine", key, value);
    setWine(wine => ({...wine, [key]: value}));
  };

  const actions = {setWine, updateWine, setLoading, setShowErrors};

  const providerValue = useMemo(() => ({wine, actions, loading, showErrors}), [wine, actions, loading, showErrors]);

    return (
      <WineContext.Provider value={providerValue}>
        {children}
      </WineContext.Provider>
    )
};

export const WineConsumer = WineContext.Consumer;