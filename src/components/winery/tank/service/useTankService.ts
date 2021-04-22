import useCrudeApi from "../../../../services/useCrudeApi";
import {Tank} from "../types/Tank";

const useTankService = () => {

    const crudeApi = useCrudeApi<Tank>("/ajax/tanks");
    const {get, getAll, getList, post, put, del} = crudeApi;

    const getAvailableList = () => {
        return crudeApi.getAllWithParams(new Map<string, boolean>([["available", true]]));
    };

    return {
        get, getAll, getList, post, put, del, getAvailableList
    }
};


export default useTankService;