import React, {useMemo, useState} from 'react';

export const HarvestContext = React.createContext();

const HarvestProvider = ({children}) => {

    const [harvest, setHarvest] = useState(undefined);

    const updateHarvest = (key, value) => {
        setHarvest(harvest => ({...harvest, [key]: value}));
    };

    const updateBox = (key, value) => {
        const field = 'box';
        setHarvest(harvest => ({
                    ...harvest, [field]:
                            {
                                ...harvest[field], [key]: value
                            }
                })
        );
    };

    const actions = {
        setHarvest: setHarvest,
        updateHarvest: updateHarvest,
        updateBox: updateBox
    };

    const providerValue = useMemo(() => ({harvest, actions}), [harvest, actions]);

    console.log('HarvestProvider::render', harvest);

    return (
            <HarvestContext.Provider value={providerValue}>
                {children}
            </HarvestContext.Provider>
    )
};

export default HarvestProvider;