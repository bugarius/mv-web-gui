import React from "react";
import ParcelFormContainer from "./ParcelFromContainer";
import {withRouter} from "react-router";
import SimpleParcelForm from "./SimpleParcelForm";

const ParcelForm = (props) => {

    return (
            <ParcelFormContainer {...props} render={(parcel, loading, onChange, onSubmit, showErrors) => (
                    <SimpleParcelForm parcel={parcel}
                                      loading={loading}
                                      onChange={onChange}
                                      onSubmit={onSubmit}
                                      showErrors={showErrors}
                    />
            )}/>
    )
};

export default withRouter(ParcelForm);