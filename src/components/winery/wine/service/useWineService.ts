import useCrudeApi from "../../../../services/useCrudeApi";
import {Wine} from "../types/Wine";
import useFetch from "../../../../services/useFetch";
import {useParams} from "react-router-dom";
import {Ingredient} from "../../ingredient/types/Ingredient";

const useWineService = () => {

    const {harvestId, wineId} = useParams();
    const {get, post, put, del} = useCrudeApi<Wine>(`/ajax/wines`);
    const {getAll} = useCrudeApi<Wine>(`/ajax/wines${harvestId ? `/harvest/${harvestId}` : ""}`);
    const {putBody: addIngredient, del: delIngredient} = useFetch<Ingredient>(`/ajax/wines/${wineId}/ingredient`);
    const {getAllWithParams: getByHarvest} = useCrudeApi<Wine>(`/ajax/wines/harvest/${harvestId}`);

    return {
        get, getAll, post, put, del, addIngredient, delIngredient, getByHarvest
    }
};


export default useWineService;