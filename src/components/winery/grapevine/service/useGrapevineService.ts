import useCrudeApi from "../../../../services/useCrudeApi";
import {Grapevine} from "../types/Grapevine";
import {Parcel} from "../../parcel/types/Parcel";

const useGrapevineService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Grapevine>("/ajax/grapevines");
    const {putId: archive} = useCrudeApi<Parcel>("/ajax/grapevines/archive");
    const {putId: revertArchive} = useCrudeApi<Parcel>("/ajax/grapevines/revert-archive");

    return {
        get, getAll, getList, post, put, del, archive, revertArchive
    }
};


export default useGrapevineService;