import useCrudeApi from "../../../../services/useCrudeApi";
import {Tank} from "../types/Tank";

const useTankService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Tank>("/ajax/tanks");

    return {
        get, getAll, getList, post, put, del
    }
};


export default useTankService;