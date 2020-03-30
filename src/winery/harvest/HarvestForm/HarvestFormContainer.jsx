import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../platform/AuthContext";
import {HarvestValidator, ParcelValidator} from "../../../services/Validators";
import {HarvestContext} from "../HarvestContext";
import HarvestService from "../service/HarvestService";

const HarvestFormContainer = ({match: {params: {harvestId}}, history, render}) => {

    const {harvest, actions: {setHarvest, updateHarvest}} = useContext(HarvestContext);
    const {principal} = useContext(AuthContext);

    const [loading, setLoading] = useState(harvestId);
    const [error, setError] = useState(!harvestId && 'NoSuchParcelError');
    const [showErrors, setShowErrors] = useState(false);

    const updateGrapevineInHarvest = (value) => {
        const grapevine = {id: value.value, label: value.label};
        updateHarvest('grapevine', grapevine);
    };

    useEffect(() => {
        HarvestService.get(harvestId)
                .then(res => {
                    setHarvest(res);
                    setLoading(false);
                    setError(!res && 'NoSuchParcelError')
                })
                .catch(res => {
                    const error = knownErrors[res.status];
                    error && setError(error);
                    error || history.push(`/error/${res.status}`);
                });
        return setHarvest(undefined);
    }, [harvestId]);

    const knownErrors = {
        404: 'NoSuchAgreementError',
        401: 'UnauthorizedError',
        403: 'ForbiddenError',
    };

    const onSubmit = (e) =>
    {
        e.preventDefault();
        console.log('HarvestForm:onSubmit', e, harvest);
        setLoading(true);
        setShowErrors(!HarvestValidator.isValid(harvest));

        if (HarvestValidator.isValid(harvest))
        {
            const action = () => (harvest.id || false ? HarvestService.put(harvest) : HarvestService.post(harvest));
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

    const handleSubmit = (harvest) => {
        console.log('HarvestForm::handleSubmit', harvest);
        setHarvest(harvest);

        setLoading(false);
        setError(!harvest && 'NoSuchHarvestError');
        history.push(`${principal.realms[0]}/harvest/all`);
    };

    console.log("HarvestForm::render", harvest);
    return render(harvest, loading, (e) => updateHarvest(e.target.name, e.target.value), updateGrapevineInHarvest, onSubmit, showErrors);
};

export default HarvestFormContainer;