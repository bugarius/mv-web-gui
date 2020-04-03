import {useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import log from "loglevel";
import {useHarvestContext} from "../HarvestContext";
import useHarvestService from "../service/useHarvestService";
import {StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Grapevine} from "../../grapevine/types/Grapevine";

const HarvestInfoContainer = ({render}) => {

    const {harvest, updateHarvest, setHarvestResult} = useHarvestContext();
    const service = useHarvestService();
    const {harvestId} = useParams();
    const history = useHistory();

    useEffect(() => {
        setHarvestResult({status: StatusType.loading});
        harvestId && service.get(parseInt(harvestId))
            .then(response => {
                setHarvestResult({status: StatusType.loaded, payload: response});
            })
            .catch(error => setHarvestResult(new ResponseError<Grapevine>(error)));

        return () => updateHarvest("reset", "");
    }, [harvestId]); // eslint-disable-line react-hooks/exhaustive-deps

    const edit = () => {
        history.push(`/mv/harvest/${harvestId}/`);
    };

    const dispose = (e, disposeAll) => {
        e.preventDefault();
        if (window.confirm("Czy jesteś pewien?"))
        {
            setHarvestResult({status: StatusType.loading});
            harvest.allDisposedToWine = disposeAll;
            harvest?.id && service.put(harvest.id, harvest)
                .then(response => {
                    setHarvestResult({status: StatusType.loaded, payload: response});
                })
                .catch(error => setHarvestResult(new ResponseError<Grapevine>(error)));
        }
    };

    const addBoxToHarvest = (e) => {
        e.preventDefault();
        log.debug('HarvestInfo:onSubmit', e, harvest);
        setHarvestResult({status: StatusType.loading});

        const action = () => harvest?.id ? service.put(harvest.id, harvest) : service.post(harvest);
        action()
            .then(response => {
                setHarvestResult({status: StatusType.loaded, payload: response});
                history?.push(`/mv/harvest/${harvestId}/info`);
            })
            .catch(res => {
                log.warn(res);
                history.push(`/mv/error`);
            });
    };

    const loading = (harvestId) => {
        // setReload(true);
    };

    return render({addBoxToHarvest, edit, dispose});
};

export default HarvestInfoContainer;