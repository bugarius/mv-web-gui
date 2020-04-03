import React from "react";
import HarvestFormContainer from "./HarvestFormContainer";
import SimpleHarvestForm from "./SimpleHarvestForm";

const HarvestForm = () => {

    return (
            <HarvestFormContainer render={(updateGrapevineInHarvest, onSubmit) => (
                    <SimpleHarvestForm updateGrapevineInHarvest={updateGrapevineInHarvest}
                                       onSubmit={onSubmit}
                    />
            )}/>
    )
};

export default HarvestForm;