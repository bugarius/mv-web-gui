import useCrudeApi from "../../../../services/useCrudeApi";
import {BoxWithGrapes} from "../types/BoxWithGrapes";
import {useParams} from "react-router-dom";
import {Parcel} from "../../parcel/types/Parcel";

const useBoxService = () => {

    const {harvestId} = useParams()

    const {get, getAll, post, put, del} = useCrudeApi<BoxWithGrapes>(`/ajax/boxes/${harvestId}`);
    const {putId: archive} = useCrudeApi<Parcel>("/ajax/boxes/archive");
    const {putId: revertArchive} = useCrudeApi<Parcel>("/ajax/boxes/revert-archive");

    return {
        get, getAll, post, put, del, archive, revertArchive
    }
};


export default useBoxService;