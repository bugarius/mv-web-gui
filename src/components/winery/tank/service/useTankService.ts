import useCrudeApi from "../../../../services/useCrudeApi";
import {Tank} from "../types/Tank";
import {Parcel} from "../../parcel/types/Parcel";

const useTankService = () => {

    const crudeApi = useCrudeApi<Tank>("/ajax/tanks");
    const {get, getAll, getList, post, put, del} = crudeApi;
    const {putId: archive} = useCrudeApi<Parcel>("/ajax/tanks/archive");
    const {putId: revertArchive} = useCrudeApi<Parcel>("/ajax/tanks/revert-archive");

    const getAvailableList = () => {
        return crudeApi.getAllWithParams(new Map<string, boolean>([["available", true]]));
    };

    return {
        get, getAll, getList, post, put, del, getAvailableList, archive, revertArchive
    }
};


export default useTankService;