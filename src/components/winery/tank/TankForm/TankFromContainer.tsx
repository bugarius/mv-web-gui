import {ChangeEvent, useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import useTankService from "../service/useTankService";
import {ResponseError} from "../../../error/ResponseError";
import {Tank} from "../types/Tank";
import log from "loglevel";
import {useTankContext} from "../TankContext";

const TankFormContainer = ({render}) => {

    const {tank, updateTank, setTankResult, tankResult} = useTankContext();

    const service = useTankService();

    const {tankId} = useParams();
    const history = useHistory();

    useEffect(() => {
        setTankResult({status: StatusType.loading});
        if (tankId?.toString() === "0")
        {
            setTankResult({status: StatusType.loaded});
            return;
        }
        tankId && service.get(parseInt(tankId))
            .then(response => {
                setTankResult({status: StatusType.loaded, payload: response});
            })
            .catch(response => setTankResult(new ResponseError<Tank>(response) as ServiceError<Tank>));

        return () => {
            updateTank("reset", "")
        }
    }, [tankId]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdateTank = (e: ChangeEvent<HTMLInputElement>) => {
        updateTank(e.target.name, e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        log.debug('TankForm:onSubmit', e, tank);
        setTankResult({status: StatusType.loading});

        const action = () => (tank?.id ? service.put(tank.id, tank) : service.post(tank));
        action()
            .then(response => {
                setTankResult(response);
                history?.push(history?.location?.state!['from'] || `mv/tank/all`);
            })
            .catch(response => setTankResult(new ResponseError<Tank>(response) as ServiceError<Tank>));
    };

    const error = tankResult as ServiceError<Tank>;

    log.debug("TankForm::render", tank);
    return render(onSubmit,
        tank,
        handleUpdateTank,
        error,
        tankResult.status === StatusType.loading);
};

export default TankFormContainer;