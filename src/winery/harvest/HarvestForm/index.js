import React from "react";
import {withRouter} from "react-router-dom";
import HarvestFormContainer from "./HarvestFormContainer";
import SimpleHarvestForm from "./SimpleHarvestForm";

const HarvestForm = (props) => {

    return (
            <HarvestFormContainer {...props}
                                  render={(harvest, loading, updateHarvest, updateGrapevineInHarvest, onSubmit, showErrors) => (
                                          <SimpleHarvestForm harvest={harvest}
                                                             loading={loading}
                                                             updateHarvest={updateHarvest}
                                                             updateGrapevineInHarvest={updateGrapevineInHarvest}
                                                             onSubmit={onSubmit}
                                                             showErrors={showErrors}
                                          />
                                  )}/>
    )
};

export default withRouter(HarvestForm);