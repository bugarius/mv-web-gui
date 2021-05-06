import {useState} from "react";
import {useProductionEventContext} from "../ProductionEventContext";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import log from "loglevel";
import {ResponseError} from "../../../error/ResponseError";
import {ProductionEvent} from "../../wine/types/Wine";
import {useHistory, useParams} from "react-router-dom";
import {useWineContext} from "../../wine/WineContext";
import useWineService from "../../wine/service/useWineService";
import {ToApiConverter} from "../../../../services/Converters";
import {useEventHandlerActions} from "../../common/useEventHandlerActions";

export const useProductionEventOnClickService = () => {

    const {
        productionEvent: event,
        setProductionEventResult: setResult,
        updateProductionEvent: update
    } = useProductionEventContext();

    const {productionEventId} = useParams();

    const {setWineResult} = useWineContext();

    const [key, setKey] = useState(new Date());

    const service = useWineService();

    const history = useHistory();

    const {onChange, updateSelect: updateTypeSelect, updateDateTime: updateDate} = useEventHandlerActions(update);

    const saveOnSubmit = (e) => {
        e.preventDefault();
        setResult({status: StatusType.loading});
        service.addEvent(ToApiConverter.convertEvent(event))
            .then(response => {
                update("reset", "");
                setResult({status: StatusType.loaded});
                setWineResult({status: StatusType.loaded, payload: response});
                setKey(new Date());
            })
            .catch(response => {
                log.debug(response);
                // setWineResult({status: StatusType.loaded});
                setResult(new ResponseError<ProductionEvent>(response) as ServiceError);
            });
    };

    const updateOnSubmit = (e) => {
        e.preventDefault();
        if (productionEventId)
        {
            setResult({status: StatusType.loading});
            service.editEvent(parseInt(productionEventId), ToApiConverter.convertEvent(event))
                .then(() => history.push(history?.location?.state?.['from'] || `/mv/wine/all`))
                .catch(response => {
                    log.debug(response);
                    setWineResult({status: StatusType.loaded});
                    setResult(new ResponseError<ProductionEvent>(response) as ServiceError);
                });
        }
    };

    return {
        onChange,
        updateTypeSelect,
        onSubmit: {update: updateOnSubmit, save: saveOnSubmit},
        updateDate,
        key
    }
}