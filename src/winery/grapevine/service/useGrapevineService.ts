import useCrudeApi from "../../../services/useCrudeApi";
import {Grapevine} from "../types/Grapevine";

const useGrapevineService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Grapevine>("/ajax/grapevines");

    return {
        get, getAll, getList, post, put, del
    }
};


export default useGrapevineService;