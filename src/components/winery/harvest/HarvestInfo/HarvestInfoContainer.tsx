import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import log from "loglevel";
import {useHarvestContext} from "../HarvestContext";
import useHarvestService from "../service/useHarvestService";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Grapevine} from "../../grapevine/types/Grapevine";
import {Harvest} from "../types/Harvest";
import {defaultError} from "../../parcel/ParcelContext";
import {useWineContext} from "../../wine/WineContext";
import {usePushHistory} from "../../common/usePushHistory";

const HarvestInfoContainer = ({render}) => {

    const {harvest, setHarvestResult, setError: setHarvestError} = useHarvestContext();
    const {setError: setWineError} = useWineContext();
    const [reload, setReload] = useState(false);
    const service = useHarvestService();
    const {harvestId} = useParams();
    const {pushHistory} = usePushHistory();

    useEffect(() => {
        setHarvestResult({status: StatusType.loading});
        harvestId && service.get(parseInt(harvestId))
            .then(response => {
                setHarvestResult({status: StatusType.loaded, payload: response});
            })
            .catch(error => setHarvestResult(new ResponseError<Grapevine>(error)));
        setReload(false);
    }, [harvestId, reload]); // eslint-disable-line react-hooks/exhaustive-deps

    const edit = () => {
        pushHistory(`/mv/harvest/e/${harvestId}/`);
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
                .catch(error => setHarvestResult(new ResponseError<Harvest>(error)));
        }
    };

    const addBoxToHarvest = (e) => {
        e.preventDefault();
        log.debug('HarvestInfo:addBoxToHarvest', e, harvest);
        setHarvestResult({status: StatusType.loading});

        service.addBox(harvest.box || {})
            .then(response => {
                setHarvestResult({status: StatusType.loaded, payload: response});
                pushHistory(`/mv/harvest/${harvestId}/info`);
            })
            .catch(error => {
                log.debug(error);
                setHarvestResult(new ResponseError<Harvest>(error));
                // history.push(`/mv/error`);
            });
    };

    const reloadHarvest = () => {
        setReload(true);
        setHarvestError({...defaultError.error});
        setWineError({...defaultError.error});
    };

    const addWineToHarvest = () => {
        pushHistory(`/mv/wine/info/0/${harvestId}`);
    }

    return render({addBoxToHarvest, edit, dispose, reloadHarvest, addWineToHarvest});
};

export default HarvestInfoContainer;