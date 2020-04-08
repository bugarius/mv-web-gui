import React from "react";
import ParcelFormContainer from "./TankFromContainer";
import SimpleTankForm from "./SimpleTankForm";

const TankForm = (props) => {

    return (
            <ParcelFormContainer {...props} render={(onSubmit) => (
                    <SimpleTankForm onSubmit={onSubmit}
                    />
            )}/>
    )
};

export default TankForm;