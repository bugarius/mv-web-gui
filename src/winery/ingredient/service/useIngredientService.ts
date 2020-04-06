import useCrudeApi from "../../../services/useCrudeApi";
import {Ingredient} from "../types/Ingredient";

const useIngredientService = () => {

    const {get, getAll, getList, post, put, del} = useCrudeApi<Ingredient>("/ajax/ingredients");
    const crudeApi = useCrudeApi<Ingredient>("/ajax/ingredients");

    const getAllByType = (type) => {
        return crudeApi.getAllWithParams(new Map<string, string>([["t", type]]));
    };

    return {
        get, getAll, getAllByType, getList, post, put, del
    }
};


export default useIngredientService;