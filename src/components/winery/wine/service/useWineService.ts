import useCrudeApi from "../../../../services/useCrudeApi";
import {ProductionEvent, Wine} from "../types/Wine";
import useFetch from "../../../../services/useFetch";
import {useParams} from "react-router-dom";
import {Ingredient} from "../../ingredient/types/Ingredient";

const useWineService = () => {

    const {harvestId, wineId} = useParams();
    const {get, post, put, del, getList} = useCrudeApi<Wine>(`/ajax/wines`);
    const {getAll} = useCrudeApi<Wine>(`/ajax/wines${harvestId ? `/harvest/${harvestId}` : ""}`);
    const {putBody: addIngredient, del: delIngredient} = useFetch<Ingredient>(`/ajax/wines/${wineId}/ingredient`);
    const {getAllWithParams: getByHarvest} = useCrudeApi<Wine>(`/ajax/wines/harvest/${harvestId}`);

    const eventWineCrudApi = useCrudeApi<ProductionEvent>(`/ajax/wines/${wineId}/event`);

    const addEvent = (body: ProductionEvent) => {
        return eventWineCrudApi.putBody(body);
    }

    const editEvent = (eventId: number, body: ProductionEvent) => {
        return eventWineCrudApi.put(eventId, body);
    }

    const removeEvent = (eventId: number) => {
        return eventWineCrudApi.del(eventId);
    }

    return {
        get, getList, getAll, post, put, del, addIngredient, delIngredient, getByHarvest, addEvent, editEvent, removeEvent
    }
};


export default useWineService;