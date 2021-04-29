import useCrudeApi from "../../../../services/useCrudeApi";
import {Harvest} from "../types/Harvest";
import {useParams} from "react-router-dom";
import {BoxWithGrapes} from "../../box/types/BoxWithGrapes";
import {Parcel} from "../../parcel/types/Parcel";

const useHarvestService = () => {

    const {harvestId} = useParams();

    const crudeApi = useCrudeApi<Harvest>("/ajax/harvests");
    const {get, getAll, getList, post, put, del} = crudeApi;
    const {putId: dispose} = useCrudeApi<Harvest>("/ajax/harvests/dispose");
    const {putId: revertDispose} = useCrudeApi<Harvest>("/ajax/harvests/revert-dispose");
    const {putBody: addBox} = useCrudeApi<BoxWithGrapes>(`/ajax/harvests/${harvestId}/box`);
    const {putId: archive} = useCrudeApi<Parcel>("/ajax/harvests/archive");
    const {putId: revertArchive} = useCrudeApi<Parcel>("/ajax/harvests/revert-archive");

    const getAvailableList = () => {
        return crudeApi.getAllWithParams(new Map<string, boolean>([["available", true]]));
    };

    return {
        get, getAll, getList, getAvailableList, post, put, del, addBox, dispose, revertDispose, archive, revertArchive
    }
};


export default useHarvestService;