import React from "react";
import WineFormContainer from "./WineFormContainer";
import {SimpleWineForm} from "./SimpleWineForm";

const GrapevineForm = (props) => {

    return (
        <WineFormContainer {...props}
                           render={(updateHarvestInWine, updateTankInWine, onSubmit, error, wine, updateWine, loading) => (
                               <SimpleWineForm updateHarvestInWine={updateHarvestInWine}
                                               updateTankInWine={updateTankInWine}
                                               onSubmit={onSubmit}
                                               error={error}
                                               wine={wine}
                                               updateWine={updateWine}
                                               loading={loading}
                               />
                           )}/>
    )
};

export default GrapevineForm;