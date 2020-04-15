import React, {useEffect, useState} from "react";

const EntityReceiver = ({entityId, history, render, service}) => {

    const {entity, setEntity} = useState({});
    const [entityLoading, setLoading] = useState(entityId);

    const knownErrors = {
        404: 'NoSuchAgreementError',
        401: 'UnauthorizedError',
        403: 'ForbiddenError',
    };

    useEffect(() => {
        service.get(entityId)
                .then(res => {
                    setEntity(res);
                    setLoading(false);
                })
                .catch(res => {
                    const error = knownErrors[res.status];
                    error || history.push(`/error/${res.status}`);
                });
    }, [entityId]);

    return render(entity, entityLoading);
};

export default EntityReceiver;