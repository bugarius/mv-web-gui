import {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import log from "loglevel";
import {useHarvestContext} from "../HarvestContext";
import useHarvestService from "../service/useHarvestService";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Grapevine} from "../../grapevine/types/Grapevine";

const HarvestInfoContainer = ({render}) => {

    const {harvest, updateHarvest, setHarvestResult} = useHarvestContext();
    const [reload, setReload] = useState(false);
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
        setReload(false);
        return () => updateHarvest("reset", "");
    }, [harvestId, reload]); // eslint-disable-line react-hooks/exhaustive-deps

    const edit = () => {
        history.push(`/mv/harvest/${harvestId}/`);
    };

    const dispose = (e) => {
        e.preventDefault();
        if (window.confirm("Czy jesteś pewien?"))
        {
            setHarvestResult({status: StatusType.loading});
            const action = harvest.allDisposedToWine ? service.revertDispose : service.dispose;
            harvest?.id && action(harvest.id)
                .then(response => {
                    setHarvestResult({status: StatusType.loaded, payload: response});
                })
                .catch(error => setHarvestResult(new ResponseError<Grapevine>(error)));
        }
    };

    const addBoxToHarvest = (e) => {
        e.preventDefault();
        log.debug('HarvestInfo:addBoxToHarvest', e, harvest);
        setHarvestResult({status: StatusType.loading});

       service.addBox(harvest.box)
            .then(response => {
                setHarvestResult({status: StatusType.loaded, payload: response});
                history?.push(`/mv/harvest/${harvestId}/info`);
            })
            .catch(res => {
                log.warn(res);
                history.push(`/mv/error`);
            });
    };

    const reloadHarvest = () => {
        setReload(true);
    };

    return render({addBoxToHarvest, edit, dispose, reloadHarvest});
};

export default HarvestInfoContainer;