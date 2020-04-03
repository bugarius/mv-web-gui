import useParcelService from "./useParcelService";
import {useEffect, useState} from "react";
import {Service, StatusType} from "../../../services/types/Service";
import {Parcel} from "../types/Parcel";
import {ResponseError} from "../../../error/ResponseError";
import {SelectOption} from "../../../services/types/SelectOption";

const useParcelsReceiver = (value?) => {

    const service = useParcelService();
    const [result, setResult] = useState<Service<Parcel[]>>({
        status: StatusType.loading
    });
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [selected, setSelected] = useState<SelectOption[]>([]);

    useEffect(() => {
        if (value)
        {
            setSelected(value?.map((p) => ({value: p.id, label: (p.label || false ? p.label : p.registrationNumber + " - " + p.district)})));
            return;
        }
        if (!result?.payload) {
            service?.getList()
                .then(response => {
                    setResult({status: StatusType.loaded, payload: response});
                    setOptions(response?.map((p) => ({value: p.id, label: p.registrationNumber + " - " + p.district})))
                })
                .catch(error => setResult(new ResponseError(error)));
        }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return {result, options, selected};
};


export default useParcelsReceiver;