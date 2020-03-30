import React, {useMemo, useState} from 'react';

export const ParcelContext = React.createContext();

const ParcelProvider = ({children}) => {

    const [parcel, setParcel] = useState(undefined);

    const updateParcel = (key, value) => {
        setParcel(parcel => ({...parcel, [key]: value}));
    };

    const providerValue = useMemo(() => ({parcel, setParcel, updateParcel}), [parcel, setParcel, updateParcel]);

    return (
            <ParcelContext.Provider value={providerValue}>
                {children}
            </ParcelContext.Provider>
    )
};

export default ParcelProvider;