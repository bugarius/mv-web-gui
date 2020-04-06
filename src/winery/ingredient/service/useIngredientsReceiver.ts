import {useEffect, useState} from "react";
import {Service, StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import useIngredientService from "./useIngredientService";
import {Ingredient} from "../types/Ingredient";
import {SelectOption} from "../../../services/types/SelectOption";
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
        if (type !== null)
        {
            setSelectedType(type);
        }
        if (!result?.payload || type !== selectedType)
        {
            const action = type ? service.getAllByType(type) : service.getList();
            action.then(response => {
                setResult({status: StatusType.loaded, payload: response});
                setOptions(response?.map((i) => ({...i, value: i.id, label: i.name})))
            })
                .catch(error => setResult(new ResponseError(error)));
        }
        return () => setSelectedType(null);
    }, [value, type, selectedType, result]); // eslint-disable-line react-hooks/exhaustive-deps

    return {result, options, selected};
};


export default useIngredientsReceiver;