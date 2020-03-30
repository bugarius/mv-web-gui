import IngredientApi from "./IngredientApi";
import {FromApiConverter, ToApiConverter} from "../../../services/Converters";

const IngredientService = {
  getList(page, wineId) {
    return IngredientApi.getList(page, wineId);
  },

  getAll(type) {
    return IngredientApi.getAll(type)
      .then(FromApiConverter.convertIngredientList);
  },

  get: (id) => {
    return IngredientApi.get(id)
      .then(FromApiConverter.convertIngredient);
  },

  post: (ingredient) => {
    console.log('IngredientService:post', ingredient);

    return IngredientApi.post(ingredient.id, ToApiConverter.convertIngredient(ingredient))
      .then(FromApiConverter.convertIngredient);
  },

  put: (ingredient) => {
    console.log('IngredientService:put', ingredient);

    return IngredientApi.put(ingredient.id, ToApiConverter.convertIngredient(ingredient))
            .then(FromApiConverter.convertIngredient);
  },

  delete: (ingredient, wineId, page) => {
    console.log('IngredientService:delete', ingredient, wineId);
    return IngredientApi.delete(ingredient.id, wineId, page);
  },
};

export default IngredientService;
