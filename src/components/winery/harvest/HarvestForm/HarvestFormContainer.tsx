import {useEffect} from 'react';
import {useHarvestContext} from "../HarvestContext";
import useHarvestService from "../service/useHarvestService";
import {useHistory, useParams} from "react-router-dom";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {Harvest} from "../types/Harvest";
import {useEventHandlerActions} from "../../common/useEventHandlerActions";

const HarvestFormContainer = ({render}) => {

    const {harvest, updateHarvest, setHarvestResult, harvestResult} = useHarvestContext();

    const service = useHarvestService();

    const {harvestId} = useParams();
    const history = useHistory();

    const {
        updateDate,
        onChange: handleUpdateHarvest,
        updateEntitySelect: updateGrapevineInHarvest
    } = useEventHandlerActions(updateHarvest);

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
            .catch(response => setHarvestResult(new ResponseError<Harvest>(response) as ServiceError));

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
                history?.push(history?.location?.state?.['from'] || `/mv/harvest/all`);
            })
            .catch(response => setHarvestResult(new ResponseError<Harvest>(response) as ServiceError));
    };

    const onClickBack = () => {
        history?.push(history?.location?.state?.['from'] || `/mv/harvest/archived`);
    }

    const error = harvestResult as ServiceError;

    log.debug("HarvestForm::render", harvest);
    return render(
        updateGrapevineInHarvest,
        onSubmit,
        error,
        harvest,
        handleUpdateHarvest,
        updateDate,
        harvestResult.status === StatusType.loading,
        onClickBack);
};

export default HarvestFormContainer;