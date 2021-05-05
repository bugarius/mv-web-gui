import useCrudeApi from "../../../../services/useCrudeApi";
import {Parcel} from "../types/Parcel";

const useParcelService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Parcel>("/ajax/parcels");
    const {putId: archive} = useCrudeApi<Parcel>("/ajax/parcels/archive");
    const {putId: revertArchive} = useCrudeApi<Parcel>("/ajax/parcels/revert-archive");

    return {
        get, getAll, getList, post, put, del, archive, revertArchive
    }
};


export default useParcelService;