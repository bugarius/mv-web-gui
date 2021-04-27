import useTankService from "./useTankService";
import {useEffect, useState} from "react";
import {Service, ServiceWorking, StatusType} from "../../../../services/types/Service";
import {Tank} from "../types/Tank";
import {ResponseError} from "../../../error/ResponseError";
import {SelectOption} from "../../../../services/types/SelectOption";

const useTanksReceiver = (value?) => {

    const service = useTankService();
    const [result, setResult] = useState<Service<Tank[]>>({
        status: StatusType.loading
    });
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [selected, setSelected] = useState<SelectOption | string>('');

    useEffect(() => {
        if (value)
        {
            setSelected(value?.id ?
                {
                    value: value.id,
                    label: value.label ? value.label : value.number + " - " + value.capacity + " l."
                }
                : '');
        }
        const workingResult = result as ServiceWorking<Tank[]>;
        if (!workingResult?.payload) {
            service?.getAvailableList()
                .then(response => {
                    setResult({status: StatusType.loaded, payload: response});
                    setOptions(response?.map((t) => ({value: t.id, label: t.number + " - " + t.capacity + " l."})))
                })
                .catch(error => setResult(new ResponseError(error)));
        }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return {result, options, selected};
};


export default useTanksReceiver;