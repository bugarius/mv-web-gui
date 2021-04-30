import useCrudeApi from "../../../../services/useCrudeApi";
import {Grapevine} from "../types/Grapevine";

const useGrapevineService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Grapevine>("/ajax/grapevines");
    const {putId: archive} = useCrudeApi<Grapevine>("/ajax/grapevines/archive");
    const {putId: revertArchive} = useCrudeApi<Grapevine>("/ajax/grapevines/revert-archive");

    return {
        get, getAll, getList, post, put, del, archive, revertArchive
    }
};


export default useGrapevineService;