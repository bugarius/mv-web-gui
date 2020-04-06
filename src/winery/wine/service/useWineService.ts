import useCrudeApi from "../../../services/useCrudeApi";
import {Wine} from "../types/Wine";
import useFetch from "../../../services/useFetch";

const useWineService = (wineId?: number | string) => {

    const {get, getAll, post, put, del} = useCrudeApi<Wine>("/ajax/wines");
    const {putBody: addIngredient, del: delIngredient} = useFetch<Wine>(`/ajax/wines/${wineId}/ingredient`);
    const {get: getByHarvest} = useFetch<Wine>(`/ajax/wines/harvest`);

    return {
        get, getAll, post, put, del, addIngredient, delIngredient, getByHarvest
    }
};


export default useWineService;