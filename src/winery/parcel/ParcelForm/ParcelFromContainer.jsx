import React, {useContext, useEffect, useState} from 'react';
import {ParcelContext} from "../ParcelContext";
import {AuthContext} from "../../../platform/AuthContext";
import {ParcelValidator} from "../../../services/Validators";
import ParcelService from "../service/ParcelService";

const ParcelFormContainer = ({match: {params: {parcelId}}, history, render}) => {

    const {parcel, setParcel, updateParcel} = useContext(ParcelContext);
    const {principal} = useContext(AuthContext);

    const [loading, setLoading] = useState(parcelId);
    const [error, setError] = useState(!parcelId && 'NoSuchParcelError');
    const [showErrors, setShowErrors] = useState(false);

    const knownErrors = {
        404: 'NoSuchAgreementError',
        401: 'UnauthorizedError',
        403: 'ForbiddenError',
    };

    useEffect(() => {
        ParcelService.get(parcelId)
                .then(res => {
                    setParcel(res);
                    setLoading(false);
                    setError(!res && 'NoSuchParcelError')
                })
                .catch(res => {
                    const error = knownErrors[res.status];
                    error && setError(error);
                    error || history.push(`/error/${res.status}`);
                });
        return setParcel(undefined);
    }, [parcelId]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('ParcelForm:onSubmit', e, parcel);
        setLoading(true);
        setShowErrors(!ParcelValidator.isValid(parcel));

        if (ParcelValidator.isValid(parcel))
        {
            const action = () => (parcel.id || false ? ParcelService.put(parcel) : ParcelService.post(parcel));
            action()
                    .then(handleSubmit)
                    .catch(res => {
                        const error = knownErrors[res.status];
                        error && setError(error);
                        error || history.push(`/error/${res.status}`);
                    });
        }
        else
        {
            setLoading(false);
        }
    };

    const handleSubmit = (parcel) => {
        console.log('ParcelForm::handleSubmit', parcel);
        setParcel(parcel);
        setLoading(false);
        setError(!parcel && 'NoSuchParcelError');
        history.push(`${principal.realms[0]}/parcel/all`);
    };

    console.log("ParcelForm::render", parcel);
    return render(parcel, loading, (e) => updateParcel(e.target.name, e.target.value), onSubmit, showErrors);
};

export default ParcelFormContainer;