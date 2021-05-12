import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useWineContext} from "../WineContext";
import useWineService from "../service/useWineService";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Wine} from "../types/Wine";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";
import {usePushHistory} from "../../common/usePushHistory";

const WineInfoContainer = ({render}) => {

    const {updateWine, setWineResult, wine} = useWineContext();
    const service = useWineService();
    const {wineId} = useParams();
    const {pushHistory} = usePushHistory();

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
        pushHistory(`/mv/wine/e/${wineId}/`);
    };

    const button = {
        action: editWine,
        label: wine?.liveStatus === EntityLiveStatus.ARCHIVED ? "Podgląd" : "Edytuj"
    };

    return render(button);
};

export default WineInfoContainer;