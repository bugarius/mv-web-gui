import {useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useWineContext} from "../WineContext";
import useWineService from "../service/useWineService";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Wine} from "../types/Wine";

const WineInfoContainer = ({render}) => {

    const {updateWine, setWineResult} = useWineContext();
    const service = useWineService();
    const {wineId} = useParams();
    const history = useHistory();

    useEffect(() => {
        setWineResult({status: StatusType.loading});
        wineId && service.get(parseInt(wineId))
            .then(response => {
                setWineResult({status: StatusType.loaded, payload: response});
            })
            .catch(error => setWineResult(new ResponseError<Wine>(error)));

        return () => updateWine("reset", "");
    }, [wineId]); // eslint-disable-line react-hooks/exhaustive-deps

    const editWine = () => {
        history.push(`/mv/wine/${wineId}/`,{from: history.location.pathname});
    };

    const actions = {editWine};

    return render(actions);
};

export default WineInfoContainer;