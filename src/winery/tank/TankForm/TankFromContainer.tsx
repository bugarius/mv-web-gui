import {useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {StatusType} from "../../../services/types/Service";
import useTankService from "../service/useTankService";
import {ResponseError} from "../../../error/ResponseError";
import {Tank} from "../types/Tank";
import log from "loglevel";
import {useTankContext} from "../TankContext";

const TankFormContainer = ({render}) => {

    const {tank, updateTank, setTankResult} = useTankContext();

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
            .catch(error => setTankResult(new ResponseError<Tank>(error)));

        return () => {
            updateTank("reset", "")
        }
    }, [tankId]); // eslint-disable-line react-hooks/exhaustive-deps

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
            .catch(res => {
                history.push(`/mv/error`);
            });
    };

    log.debug("TankForm::render", tank);
    return render(onSubmit);
};

export default TankFormContainer;