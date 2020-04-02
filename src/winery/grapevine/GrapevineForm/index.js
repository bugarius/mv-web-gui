import React from "react";
import {withRouter} from "react-router-dom";
import GrapevineFormContainer from "./GrapevineFormContainer";
import SimpleGrapevineForm from "./SimpleGrapevineForm";

const GrapevineForm = (props) => {

    return (
            <GrapevineFormContainer {...props}
                                    render={(updateParcelsInGrapevine, onSubmit) => (
                                            <SimpleGrapevineForm updateParcelsInGrapevine={updateParcelsInGrapevine}
                                                                 onSubmit={onSubmit}
                                            />
                                    )}/>
    )
};

export default withRouter(GrapevineForm);