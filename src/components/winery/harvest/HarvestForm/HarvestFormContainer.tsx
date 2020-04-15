import {useEffect} from 'react';
import {useHarvestContext} from "../HarvestContext";
import useHarvestService from "../service/useHarvestService";
import {useHistory, useParams} from "react-router-dom";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Grapevine} from "../../grapevine/types/Grapevine";
import log from "loglevel";

const HarvestFormContainer = ({render}) => {

    const {harvest, updateHarvest, setHarvestResult} = useHarvestContext();

    const service = useHarvestService();

    const {harvestId} = useParams();
    const history = useHistory();

    const updateGrapevineInHarvest = (value) => {
        const grapevine = {id: value.value, label: value.label};
        updateHarvest('grapevine', grapevine);
    };

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
            .catch(error => setHarvestResult(new ResponseError<Grapevine>(error)));

        return () => {
            updateHarvest("reset", "")
        }
    }, [harvestId]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (e) => {
        e.preventDefault();
        log.debug('HarvestForm:onSubmit', harvest);
        setHarvestResult({status: StatusType.loading});

        const action = () => harvest?.id ? service.put(harvest.id, harvest) : service.post(harvest);
        action()
            .then(response => {
                setHarvestResult(response);
                history?.push(history?.location?.state!['from'] || `mv/harvest/all`);
            })
            .catch(res => {
                log.warn(res);
                history.push(`/mv/error`);
            });
    };

    log.debug("HarvestForm::render", harvest);
    return render(updateGrapevineInHarvest, onSubmit);
};

export default HarvestFormContainer;