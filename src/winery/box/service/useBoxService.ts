import useCrudeApi from "../../../services/useCrudeApi";
import {BoxWithGrapes} from "../types/BoxWithGrapes";

const useBoxService = (harvestId: number) => {

    const {get, getAll, post, put, del} = useCrudeApi<BoxWithGrapes>(`/ajax/boxes/${harvestId}`);

    return {
        get, getAll, post, put, del
    }
};


export default useBoxService;