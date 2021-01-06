import {useEffect, useState} from "react";
import {Service, ServiceWorking, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import useIngredientService from "./useIngredientService";
import {Ingredient} from "../types/Ingredient";
import {SelectOption} from "../../../../services/types/SelectOption";
import {IngredientType} from "../types/IngredientType";

const useIngredientsReceiver = (value?, type?: IngredientType | null) => {

    const service = useIngredientService();
    const [result, setResult] = useState<Service<Ingredient[]>>({
        status: StatusType.loading
    });
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [selected, setSelected] = useState<SelectOption | string>('');

    const [selectedType, setSelectedType] = useState<IngredientType | null | undefined>(null);

    useEffect(() => {
        if (value)
        {
            setSelected(value?.id ? {...value, value: value.id, label: value.label ? value.label : value.name} : '');
        }
        if (type !== null && type !== selectedType)
        {
            setSelectedType(type);
            setResult({status: StatusType.loading});
        }
        const workingResult = result as ServiceWorking<Ingredient[]>;
        if (!workingResult?.payload || type !== selectedType)
        {
            const action = type ? service.getAllByType(type) : service.getList();
            action.then(response => {
                setResult({status: StatusType.loaded, payload: response});
                setOptions(response?.map((i) => ({...i, value: i.id, label: i.name})))
            })
                .catch(error => setResult(new ResponseError(error)));
        }
        return () => setSelectedType(null);
    }, [value, type]); // eslint-disable-line react-hooks/exhaustive-deps

    const loading = result.status === StatusType.loading;

    return {result, options, selected, loading};
};


export default useIngredientsReceiver;