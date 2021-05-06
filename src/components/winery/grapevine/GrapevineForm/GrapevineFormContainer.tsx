import {ChangeEvent, useEffect} from 'react';
import {useGrapevineContext} from "../GrapevineContext";
import useGrapevineService from "../service/useGrapevineService";
import {useHistory, useParams} from "react-router-dom";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Grapevine} from "../types/Grapevine";
import log from "loglevel";

const GrapevineFormContainer = ({render}) => {

    const {grapevine, updateGrapevine, setGrapevineResult, grapevineResult} = useGrapevineContext();

    const service = useGrapevineService();

    const {grapevineId} = useParams();
    const history = useHistory();

    const updateParcelsInGrapevine = (value) => {
        const parcels = (value || []).map((v) => ({id: v.value, label: v.label}));
        updateGrapevine('parcels', parcels);
    };

    useEffect(() => {
        setGrapevineResult({status: StatusType.loading});
        if (grapevineId?.toString() === "0")
        {
            setGrapevineResult({status: StatusType.loaded});
            return;
        }
        grapevineId && service.get(parseInt(grapevineId))
            .then(response => {
                setGrapevineResult({status: StatusType.loaded, payload: response});
            })
            .catch(response => setGrapevineResult(new ResponseError<Grapevine>(response) as ServiceError));

        return () => {
            updateGrapevine("reset", "")
        }
    }, [grapevineId]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdateGrapevine = (e: ChangeEvent<HTMLInputElement>) => {
        updateGrapevine(e.target.name, e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        log.debug('GrapevineFormContainer:onSubmit', e, grapevine);
        setGrapevineResult({status: StatusType.loading});

        const action = () => (grapevine?.id ? service.put(grapevine.id, grapevine) : service.post(grapevine));
        action()
            .then(response => {
                setGrapevineResult(response);
                history?.push(history?.location?.state?.['from'] || `/mv/grapevine/all`);
            })
            .catch(response => setGrapevineResult(new ResponseError<Grapevine>(response) as ServiceError));
    };

    const onClickBack = () => {
        history?.push(history?.location?.state?.['from'] || `/mv/grapevine/archived`);
    }

    const error = grapevineResult as ServiceError;

    log.debug("GrapevineFormContainer::render", grapevine);
    return render(
        updateParcelsInGrapevine,
        onSubmit,
        error,
        grapevine,
        handleUpdateGrapevine,
        grapevineResult.status === StatusType.loading,
        onClickBack);
};

export default GrapevineFormContainer;