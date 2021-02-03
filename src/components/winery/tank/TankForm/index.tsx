import React from "react";
import TankFromContainer from "./TankFromContainer";
import SimpleTankForm from "./SimpleTankForm";

export const TankForm = (props) => {

    return (
            <TankFromContainer {...props} render={(onSubmit, tank, updateTank, error, loading) => (
                    <SimpleTankForm onSubmit={onSubmit} tank={tank} updateTank={updateTank} error={error} loading={loading}
                    />
            )}/>
    )
};