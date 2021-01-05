import React from "react";
import TankFromContainer from "./TankFromContainer";
import SimpleTankForm from "./SimpleTankForm";

const TankForm = (props) => {

    return (
            <TankFromContainer {...props} render={(onSubmit) => (
                    <SimpleTankForm onSubmit={onSubmit}
                    />
            )}/>
    )
};

export default TankForm;