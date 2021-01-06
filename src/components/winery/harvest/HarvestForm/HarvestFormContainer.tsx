import {ChangeEvent, useEffect} from 'react';
import {useHarvestContext} from "../HarvestContext";
import useHarvestService from "../service/useHarvestService";
import {useHistory, useParams} from "react-router-dom";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {Harvest} from "../types/Harvest";

const HarvestFormContainer = ({render}) => {

    const {harvest, updateHarvest, setHarvestResult, harvestResult} = useHarvestContext();

    const service = useHarvestService();

    const {harvestId} = useParams();
    const history = useHistory();

    useEffect(() => {
        setHarvestResult({status: StatusType.loading});
        if (harvestId?.toString() === "0")
        {
            setHarvestResult({status: StatusType.loaded});
            return;
        }
        harvestId && service.get(parseInt(harvestId))
            .then(response => {
                setHarvestResult({status: StatusType.loaded, payload: response});
            })
            .catch(response => setHarvestResult(new ResponseError<Harvest>(response) as ServiceError<Harvest>));

        return () => {
            updateHarvest("reset", "")
        }
    }, [harvestId]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdateHarvest = (e: ChangeEvent<HTMLInputElement>) => {
        updateHarvest(e.target.name, e.target.value);
    };

    const updateGrapevineInHarvest = (value) => {
        const grapevine = {id: value.value, label: value.label};
        updateHarvest('grapevine', grapevine);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        log.debug('HarvestForm:onSubmit', harvest);
        setHarvestResult({status: StatusType.loading});

        const action = () => harvest?.id ? service.put(harvest.id, harvest) : service.post(harvest);
        action()
            .then(response => {
                setHarvestResult(response);
                const pushPath = history?.location?.state ? history?.location?.state['from'] : `/mv/harvest/all`;
                history?.push(pushPath);
            })
            .catch(response => setHarvestResult(new ResponseError<Harvest>(response) as ServiceError<Harvest>));
    };

    const error = harvestResult as ServiceError<Harvest>;

    log.debug("HarvestForm::render", harvest);
    return render(
        updateGrapevineInHarvest,
        onSubmit,
        error,
        harvest,
        handleUpdateHarvest,
        harvestResult.status === StatusType.loading);
};

export default HarvestFormContainer;