import React from "react";
import {withRouter} from "react-router-dom";
import GrapevineFormContainer from "./GrapevineFormContainer";
import SimpleGrapevineForm from "./SimpleGrapevineForm";

const GrapevineForm = (props) => {

    return (
            <GrapevineFormContainer {...props}
                                    render={(grapevine, loading, updateGrapevine, updateParcelsInGrapevine, onSubmit, showErrors) => (
                                            <SimpleGrapevineForm grapevine={grapevine}
                                                                 loading={loading}
                                                                 updateGrapevine={updateGrapevine}
                                                                 updateParcelsInGrapevine={updateParcelsInGrapevine}
                                                                 onSubmit={onSubmit}
                                                                 showErrors={showErrors}
                                            />
                                    )}/>
    )
};

export default withRouter(GrapevineForm);