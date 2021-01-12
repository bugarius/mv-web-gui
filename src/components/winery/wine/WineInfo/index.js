import React from "react";
import WineInfoContainer from "./WineInfoContainer";
import WineInfoPanel from "./WineInfoPanel";

const WineInfo = () => {
    return (
            <WineInfoContainer render={(button) => (
                    <WineInfoPanel button={button}/>
            )}/>
    );
};

export default WineInfo;