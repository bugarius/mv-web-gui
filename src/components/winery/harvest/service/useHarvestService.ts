import useCrudeApi from "../../../../services/useCrudeApi";
import {Harvest} from "../types/Harvest";
import {useParams} from "react-router-dom";
import {BoxWithGrapes} from "../../box/types/BoxWithGrapes";

const useHarvestService = () => {

    const {harvestId} = useParams();

    const crudeApi = useCrudeApi<Harvest>("/ajax/harvests");
    const {get, getAll, getList, post, put, del} = crudeApi;
    const {putId: dispose} = useCrudeApi<Harvest>("/ajax/harvests/dispose");
    const {putId: revertDispose} = useCrudeApi<Harvest>("/ajax/harvests/revert-dispose");
    const {putBody: addBox} = useCrudeApi<BoxWithGrapes>(`/ajax/harvests/${harvestId}/box`);

    const getAvailableList = () => {
        return crudeApi.getAllWithParams(new Map<string, boolean>([["available", true]]));
    };

    return {
        get, getAll, getList, getAvailableList, post, put, del, addBox, dispose, revertDispose
    }
};


export default useHarvestService;