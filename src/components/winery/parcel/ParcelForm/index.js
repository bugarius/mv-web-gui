import React from "react";
import ParcelFormContainer from "./ParcelFromContainer";
import SimpleParcelForm from "./SimpleParcelForm";

const ParcelForm = (props) => {

    return (
            <ParcelFormContainer {...props} render={(onSubmit) => (
                    <SimpleParcelForm onSubmit={onSubmit}
                    />
            )}/>
    )
};

export default ParcelForm;