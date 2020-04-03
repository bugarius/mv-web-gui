import useCrudeApi from "../../../services/useCrudeApi";
import {Harvest} from "../types/Harvest";

const useHarvestService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Harvest>("/ajax/harvests");

    return {
        get, getAll, getList, post, put, del
    }
};


export default useHarvestService;