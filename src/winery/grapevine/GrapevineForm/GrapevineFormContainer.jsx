import {useContext, useEffect, useState} from 'react';
import {GrapevineContext} from "../GrapevineContext";
import {AuthContext} from "../../../platform/AuthContext";
import {GrapevineValidator} from "../../../services/Validators";
import GrapevineService from "../service/GrapevineService";

const GrapevineFormContainer = ({match: {params: {grapevineId}}, history, render}) => {

    const {grapevine, setGrapevine, updateGrapevine} = useContext(GrapevineContext);
    const {principal} = useContext(AuthContext);

    const [loading, setLoading] = useState(grapevineId);
    // eslint-disable-next-line no-unused-vars
    const [showErrors, setShowErrors] = useState(false);

    const knownErrors = {
        404: 'NoSuchAgreementError',
        401: 'UnauthorizedError',
        403: 'ForbiddenError',
    };

    const updateParcelsInGrapevine = (value) => {
        const parcels = (value || []).map((v) => ({id: v.value, label: v.label}));
        updateGrapevine('parcels', parcels);
    };

    useEffect(() => {
        GrapevineService.get(grapevineId)
                .then(res => {
                    setGrapevine(res);
                    setLoading(false);
                })
                .catch(res => {
                    const error = knownErrors[res.status];
                    error || history.push(`/error/${res.status}`);
                });
        return setGrapevine(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grapevineId]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('GrapevineFormContainer:onSubmit', e, grapevine);
        setLoading(true);

        if (GrapevineValidator.isValid(grapevine))
        {
            const action = () => (grapevine.id || false ? GrapevineService.put(grapevine) : GrapevineService.post(grapevine));
            action()
                    .then(handleSubmit)
                    .catch(res => {
                        const error = knownErrors[res.status];
                        error || history.push(`/error/${res.status}`);
                    });
        }
        else
        {
            setLoading(false);
        }
    };

    const handleSubmit = (grapevine) => {
        console.log('GrapevineFormContainer::handleSubmit', grapevine);
        setGrapevine(grapevine);
        setLoading(false);
        history.push(`${principal.realms[0]}/grapevine/all`);
    };

    console.log("GrapevineFormContainer::render", grapevine);
    return render(grapevine, loading, (e) => updateGrapevine(e.target.name, e.target.value), updateParcelsInGrapevine, onSubmit, showErrors);
};

export default GrapevineFormContainer;