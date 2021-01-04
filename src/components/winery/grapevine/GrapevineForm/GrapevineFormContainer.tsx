import {useEffect} from 'react';
import {useGrapevineContext} from "../GrapevineContext";
import useGrapevineService from "../service/useGrapevineService";
import {useHistory, useParams} from "react-router-dom";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Grapevine} from "../types/Grapevine";
import log from "loglevel";

const GrapevineFormContainer = ({render}) => {

    const {grapevine, updateGrapevine, setGrapevineResult} = useGrapevineContext();

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
            .catch(error => setGrapevineResult(new ResponseError<Grapevine>(error)));

        return () => {
            updateGrapevine("reset", "")
        }
    }, [grapevineId]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (e) => {
        e.preventDefault();
        log.debug('GrapevineFormContainer:onSubmit', e, grapevine);
        setGrapevineResult({status: StatusType.loading});

        const action = () => (grapevine?.id ? service.put(grapevine.id, grapevine) : service.post(grapevine));
        action()
            .then(response => {
                setGrapevineResult(response);
                history?.push(history?.location?.state!['from'] || `mv/grapevine/all`);
            })
            .catch(error => setGrapevineResult(new ResponseError<Grapevine>(error)));
    };

    log.debug("GrapevineFormContainer::render", grapevine);
    return render(updateParcelsInGrapevine, onSubmit);
};

export default GrapevineFormContainer;