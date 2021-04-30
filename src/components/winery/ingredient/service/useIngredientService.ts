import useCrudeApi from "../../../../services/useCrudeApi";
import {Ingredient} from "../types/Ingredient";

const useIngredientService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Ingredient>("/ajax/ingredients");
    const crudeApi = useCrudeApi<Ingredient>("/ajax/ingredients");
    const {get: getApplied, put: putApplied} = useCrudeApi<Ingredient>("/ajax/ingredients/applied");
    const {putId: archive} = useCrudeApi<Ingredient>("/ajax/ingredients/archive");
    const {putId: revertArchive} = useCrudeApi<Ingredient>("/ajax/ingredients/revert-archive");

    const getAllByType = (type) => {
        return crudeApi.getAllWithParams(new Map<string, string>([["t", type]]));
    };

    return {
        get, getAll, getAllByType, getList, post, put, del, getApplied, putApplied, archive, revertArchive
    }
};


export default useIngredientService;