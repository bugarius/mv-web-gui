import {useEffect} from 'react';

import {useHistory, useParams} from "react-router-dom";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {useWineContext} from "../WineContext";
import useWineService from "../service/useWineService";
import {Wine} from "../types/Wine";

const WineFormContainer = ({render}) => {

    const {wine, updateWine, setWineResult} = useWineContext();

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
            .catch(error => setWineResult(new ResponseError<Wine>(error)));

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
            .catch(res => {
                log.warn(res)
                history.push(`/mv/error`);
            });
    };

    log.debug("WineFormContainer::render", wine);
    return render(updateHarvestInWine, updateTankInWine, onSubmit);
};

export default WineFormContainer;