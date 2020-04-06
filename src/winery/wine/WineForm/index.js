import React from "react";
import WineFormContainer from "./WineFormContainer";
import SimpleWineForm from "./SimpleWineForm";

const GrapevineForm = (props) => {

    return (
            <WineFormContainer {...props}
                               render={(updateHarvestInWine, onSubmit) => (
                                       <SimpleWineForm updateHarvestInWine={updateHarvestInWine}
                                                       onSubmit={onSubmit}
                                       />
                               )}/>
    )
};

export default GrapevineForm;