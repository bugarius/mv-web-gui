import React from "react";
import HarvestFormContainer from "./HarvestFormContainer";
import SimpleHarvestForm from "./SimpleHarvestForm";

const HarvestForm = () => {

    return (
            <HarvestFormContainer render={(updateGrapevineInHarvest, onSubmit, error, harvest, updateHarvest, loading) => (
                    <SimpleHarvestForm updateGrapevineInHarvest={updateGrapevineInHarvest}
                                       onSubmit={onSubmit}
                                       error={error}
                                       harvest={harvest}
                                       updateHarvest={updateHarvest}
                                       loading={loading}
                    />
            )}/>
    )
};

export default HarvestForm;