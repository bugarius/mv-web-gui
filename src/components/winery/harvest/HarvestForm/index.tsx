import React from "react";
import HarvestFormContainer from "./HarvestFormContainer";
import SimpleHarvestForm from "./SimpleHarvestForm";

const HarvestForm = () => {

    return (
            <HarvestFormContainer render={(updateGrapevineInHarvest, onSubmit, error, harvest, updateHarvest, updateDate, loading, onClickBack) => (
                    <SimpleHarvestForm updateGrapevineInHarvest={updateGrapevineInHarvest}
                                       onSubmit={onSubmit}
                                       error={error}
                                       harvest={harvest}
                                       updateHarvest={updateHarvest}
                                       updateDate={updateDate}
                                       loading={loading}
                                       onClickBack={onClickBack}
                    />
            )}/>
    )
};

export default HarvestForm;