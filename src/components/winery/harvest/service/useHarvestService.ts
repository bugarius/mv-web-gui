import useCrudeApi from "../../../../services/useCrudeApi";
import {Harvest} from "../types/Harvest";
import {useParams} from "react-router-dom";
import {BoxWithGrapes} from "../../box/types/BoxWithGrapes";

const useHarvestService = () => {

    const {harvestId} = useParams();

    const {get, getAll, getList, post, put, del} = useCrudeApi<Harvest>("/ajax/harvests");
    const {putId: dispose} = useCrudeApi<Harvest>("/ajax/harvests/dispose");
    const {putId: revertDispose} = useCrudeApi<Harvest>("/ajax/harvests/revert-dispose");
    const {putBody: addBox} = useCrudeApi<BoxWithGrapes>(`/ajax/harvests/${harvestId}/box`);

    return {
        get, getAll, getList, post, put, del, addBox, dispose, revertDispose
    }
};


export default useHarvestService;