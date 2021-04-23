import useCrudeApi from "../../../../services/useCrudeApi";
import {BoxWithGrapes} from "../types/BoxWithGrapes";
import {useParams} from "react-router-dom";

const useBoxService = () => {

    const {harvestId} = useParams()

    const {get, getAll, post, put, del} = useCrudeApi<BoxWithGrapes>(`/ajax/boxes/${harvestId}`);

    return {
        get, getAll, post, put, del
    }
};


export default useBoxService;