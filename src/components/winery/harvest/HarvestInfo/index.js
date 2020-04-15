import React from "react";
import HarvestInfoContainer from "./HarvestInfoContainer";
import HarvestInfoPanel from "./HarvestInfoPanel";

const HarvestInfo = () => {
    return (
        <HarvestInfoContainer render={(actions) => (
                <HarvestInfoPanel actions={actions}/>
        )}/>
    )
};

export default HarvestInfo;