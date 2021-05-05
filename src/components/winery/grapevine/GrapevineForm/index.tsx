import React from "react";
import {withRouter} from "react-router-dom";
import GrapevineFormContainer from "./GrapevineFormContainer";
import {SimpleGrapevineForm} from "./SimpleGrapevineForm";

const GrapevineForm = (props) => {

    return (
            <GrapevineFormContainer {...props}
                                    render={(updateParcelsInGrapevine, onSubmit, error, grapevine, updateGrapevine, loading, onClickBack) => (
                                            <SimpleGrapevineForm updateParcelsInGrapevine={updateParcelsInGrapevine}
                                                                 onSubmit={onSubmit}
                                                                 error={error}
                                                                 grapevine={grapevine}
                                                                 updateGrapevine={updateGrapevine}
                                                                 loading={loading}
                                                                 onClickBack={onClickBack}
                                            />
                                    )}/>
    )
};

export default withRouter(GrapevineForm);