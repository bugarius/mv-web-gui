import useCrudeApi from "../../../services/useCrudeApi";
import {Parcel} from "../types/Parcel";

const useParcelService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Parcel>("/ajax/parcels");

    return {
        get, getAll, getList, post, put, del
    }
};


export default useParcelService;