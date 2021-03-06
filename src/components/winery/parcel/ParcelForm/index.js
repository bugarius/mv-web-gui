import React from "react";
import ParcelFormContainer from "./ParcelFromContainer";
import SimpleParcelForm from "./SimpleParcelForm";

export const ParcelForm = (props) => {

    return (
            <ParcelFormContainer {...props} render={(onSubmit, error, parcel, updateParcel, onClickBack, loading) => (
                    <SimpleParcelForm onSubmit={onSubmit} error={error} parcel={parcel} updateParcel={updateParcel} onClickBack={onClickBack} loading={loading}
                    />
            )}/>
    )
};