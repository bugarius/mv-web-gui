import useCrudeApi from "../../../../services/useCrudeApi";
import {ProductionEvent, Wine} from "../types/Wine";
import useFetch from "../../../../services/useFetch";
import {useParams} from "react-router-dom";
import {Ingredient} from "../../ingredient/types/Ingredient";
import {Parcel} from "../../parcel/types/Parcel";

const useWineService = () => {

    const {harvestId, wineId} = useParams();
    const {get, post, put, del, getList} = useCrudeApi<Wine>(`/ajax/wines`);
    const {getAll} = useCrudeApi<Wine>(`/ajax/wines${harvestId ? `/harvest/${harvestId}` : ""}`);
    const {putBody: addIngredient, del: delIngredient} = useFetch<Ingredient>(`/ajax/wines/${wineId}/ingredient`);
    const {getAllWithParams: getByHarvest} = useCrudeApi<Wine>(`/ajax/wines/harvest/${harvestId}`);
    const {putId: archive} = useCrudeApi<Parcel>("/ajax/wines/archive");
    const {putId: revertArchive} = useCrudeApi<Parcel>("/ajax/wines/revert-archive");

    const eventWineCrudApi = useCrudeApi<ProductionEvent>(`/ajax/wines/${wineId}/event`);
    const {put: putIngredient} = useCrudeApi<Ingredient>(`/ajax/wines/${wineId}/ingredient`);

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
        get, getList, getAll, post, put, del, addIngredient, delIngredient, getByHarvest, addEvent, editEvent, removeEvent,
        putIngredient, archive, revertArchive
    }
};


export default useWineService;