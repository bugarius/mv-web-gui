import {ChangeEvent, useEffect} from 'react';
import {useParcelContext} from "../ParcelContext";
import {useHistory, useParams} from "react-router-dom";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import useParcelService from "../service/useParcelService";
import {ResponseError} from "../../../error/ResponseError";
import {Parcel} from "../types/Parcel";
import log from "loglevel";

const ParcelFormContainer = ({render}) => {

    const {parcel, updateParcel, setParcelResult, parcelResult} = useParcelContext();

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
            .catch(response => setParcelResult(new ResponseError<Parcel>(response) as ServiceError));

        return () => {
            updateParcel("reset", "")
        }
    }, [parcelId]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdateParcel = (e: ChangeEvent<HTMLInputElement>) => {
        updateParcel(e.target.name, e.target.value);
    };

    const onSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        log.debug('ParcelForm:onSubmit', e, parcel);
        setParcelResult({status: StatusType.loading});

        const action = () => (parcel?.id ? service.put(parcel.id, parcel) : service.post(parcel));
        action()
            .then(response => {
                setParcelResult(response);
                history?.push(history?.location?.state!['from'] || `mv/parcel/all`);
            })
            .catch(response => setParcelResult(new ResponseError<Parcel>(response) as ServiceError));
    };

    const error = parcelResult as ServiceError;

    log.debug("ParcelForm::render", parcel);
    return render(onSubmit,
        error,
        parcel,
        handleUpdateParcel,
        parcelResult.status === StatusType.loading);
};

export default ParcelFormContainer;