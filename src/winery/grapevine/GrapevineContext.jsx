import React, {useMemo, useState} from 'react';

export const GrapevineContext = React.createContext();

const GrapevineProvider = ({children}) => {

  const [grapevine, setGrapevine] = useState(undefined);

  const updateGrapevine = (key, value) => {
    setGrapevine(parcel => ({...parcel, [key]: value}));
  };

  const providerValue = useMemo(() => ({grapevine, setGrapevine, updateGrapevine}), [grapevine, setGrapevine, updateGrapevine]);

  return (
          <GrapevineContext.Provider value={providerValue}>
            {children}
          </GrapevineContext.Provider>
  )
};

export default GrapevineProvider;