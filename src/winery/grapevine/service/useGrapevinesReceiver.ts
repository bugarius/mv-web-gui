import {useEffect, useState} from "react";
import {Service, StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import useGrapevineService from "./useGrapevineService";
import {Grapevine} from "../types/Grapevine";
import {SelectOption} from "../../../services/types/SelectOption";

const useGrapevinesReceiver = (value?) => {

    const service = useGrapevineService();
    const [result, setResult] = useState<Service<Grapevine[]>>({
        status: StatusType.loading
    });
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [selected, setSelected] = useState<SelectOption | string>('');

    useEffect(() => {
        if (value)
        {
            setSelected(value?.id ? {value: value.id, label: value.label ? value.label : value.name} : '');
        }
        if (!result?.payload) {
            service?.getList()
                .then(response => {
                    setResult({status: StatusType.loaded, payload: response});
                    setOptions(response?.map((p) => ({value: p.id, label: p.name})))
                })
                .catch(error => setResult(new ResponseError(error)));
        }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return {result, options, selected};
};


export default useGrapevinesReceiver;