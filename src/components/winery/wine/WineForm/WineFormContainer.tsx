import {ChangeEvent, useEffect} from 'react';

import {useHistory, useParams} from "react-router-dom";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {useWineContext} from "../WineContext";
import useWineService from "../service/useWineService";
import {Wine} from "../types/Wine";

const WineFormContainer = ({render}) => {

    const {wine, updateWine, setWineResult, wineResult} = useWineContext();

    const service = useWineService();

    const {wineId} = useParams();
    const history = useHistory();

    const updateHarvestInWine = (value) => {
        const harvest = {id: value.value, label: value.label};
        updateWine('harvest', harvest);
    };

    const updateTankInWine = (value) => {
        const tank = {id: value.value, label: value.label};
        updateWine('tank', tank);
    };

    const handleUpdateWine = (e: ChangeEvent<HTMLInputElement>) => {
        updateWine(e.target.name, e.target.value);
    };


    useEffect(() => {
        setWineResult({status: StatusType.loading});
        if (wineId?.toString() === "0")
        {
            setWineResult({status: StatusType.loaded});
            return;
        }
        wineId && service.get(parseInt(wineId))
            .then(response => {
                setWineResult({status: StatusType.loaded, payload: response});
            })
            .catch(response => setWineResult(new ResponseError<Wine>(response) as ServiceError));

        return () => {
            updateWine("reset", "")
        }
    }, [wineId]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (e) => {
        e.preventDefault();
        log.debug('WineFormContainer:onSubmit', e, wine);
        setWineResult({status: StatusType.loading});

        const action = () => (wine?.id ? service.put(wine.id, wine) : service.post(wine));
        action()
            .then(response => {
                setWineResult(response);
                history?.push(history?.location?.state!['from'] || `mv/wine/all`);
            })
            .catch(response => setWineResult(new ResponseError<Wine>(response) as ServiceError));
    };

    const error = wineResult as ServiceError;

    log.debug("WineFormContainer::render", wine);
    return render(
        updateHarvestInWine,
        updateTankInWine,
        onSubmit,
        error,
        wine,
        handleUpdateWine,
        wineResult.status === StatusType.loading);
};

export default WineFormContainer;