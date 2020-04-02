import {useEffect} from 'react';
import {useParcelContext} from "../ParcelContext";
import {useHistory, useParams} from "react-router-dom";
import {StatusType} from "../../../services/types/Service";
import useParcelService from "../service/useParcelService";
import {ResponseError} from "../../../error/ResponseError";
import {Parcel} from "../types/Parcel";
import log from "loglevel";

const ParcelFormContainer = ({render}) => {

    const {parcel, setParcel, updateParcel, setParcelResult} = useParcelContext();

    const service = useParcelService();

    const {parcelId} = useParams();
    const history = useHistory();

    useEffect(() => {
        setParcelResult({status: StatusType.loading});
        if (parcelId?.toString() === "0")
        {
            setParcelResult({status: StatusType.loaded});
            return;
        }
        parcelId && service.get(parseInt(parcelId))
            .then(response => {
                setParcelResult({status: StatusType.loaded, payload: response});
            })
            .catch(error => setParcelResult(new ResponseError<Parcel>(error)));

        return () => {
            updateParcel("reset", "")
        }
    }, [parcelId]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (e) => {
        e.preventDefault();
        log.debug('ParcelForm:onSubmit', e, parcel);

        const action = () => (parcel?.id ? service.put(parcel.id, parcel) : service.post(parcel));
        action()
            .then(response => {
                setParcel(response);
                history?.push(history?.location?.state!['from'] || `mv/parcel/all`);
            })
            .catch(res => {
                history.push(`/error`);
            });
    };

    log.debug("ParcelForm::render", parcel);
    return render(onSubmit);
};

export default ParcelFormContainer;