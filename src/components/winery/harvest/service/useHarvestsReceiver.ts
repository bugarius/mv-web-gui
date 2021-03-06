import {useEffect, useState} from "react";
import {Service, ServiceWorking, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import useHarvestService from "./useHarvestService";
import {Harvest} from "../types/Harvest";
import {SelectOption} from "../../../../services/types/SelectOption";

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
        const workingResult = result as ServiceWorking<Harvest[]>;
        if (!workingResult?.payload)
        {
            service?.getAvailableList()
                .then(response => {
                    setResult({status: StatusType.loaded, payload: response});
                    setOptions(response?.filter(h => !h.allDisposedToWine)
                        .map((h) => ({value: h.id, label: h.grapevine.name + " - " + h.dateOfHarvest})))
                })
                .catch(error => setResult(new ResponseError(error)));
        }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return {result, options, selected};
};


export default useHarvestsReceiver;