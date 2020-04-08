import React from "react";
import WineFormContainer from "./WineFormContainer";
import SimpleWineForm from "./SimpleWineForm";

const GrapevineForm = (props) => {

    return (
            <WineFormContainer {...props}
                               render={(updateHarvestInWine, updateTankInWine,  onSubmit) => (
                                       <SimpleWineForm updateHarvestInWine={updateHarvestInWine}
                                                       updateTankInWine={updateTankInWine}
                                                       onSubmit={onSubmit}
                                       />
                               )}/>
    )
};

export default GrapevineForm;