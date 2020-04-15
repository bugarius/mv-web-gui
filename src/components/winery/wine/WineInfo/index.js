import React from "react";
import WineInfoContainer from "./WineInfoContainer";
import WineInfoPanel from "./WineInfoPanel";

const WineInfo = () => {
    return (
            <WineInfoContainer render={(actions) => (
                    <WineInfoPanel actions={actions}/>
            )}/>
    );
};

export default WineInfo;