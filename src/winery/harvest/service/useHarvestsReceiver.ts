import {useEffect, useState} from "react";
import {Service, StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import useHarvestService from "./useHarvestService";
import {Harvest} from "../types/Harvest";
import {SelectOption} from "../../../services/types/SelectOption";

const useHarvestsReceiver = (value?) => {

    const service = useHarvestService();
    const [result, setResult] = useState<Service<Harvest[]>>({
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
                    label: value.label ? value.label : value.grapevine.name + " - " + value.dateOfHarvest
                }
                : '');
        }
        if (!result?.payload)
        {
            service?.getList()
                .then(response => {
                    setResult({status: StatusType.loaded, payload: response});
                    setOptions(response?.map((h) => ({value: h.id, label: h.grapevine.name + " - " + h.dateOfHarvest})))
                })
                .catch(error => setResult(new ResponseError(error)));
        }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return {result, options, selected};
};


export default useHarvestsReceiver;