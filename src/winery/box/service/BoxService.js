import BoxApi from "./BoxApi";
import {FromApiConverter, ToApiConverter} from "../../../services/Converters";

const BoxService = {
  getList(page, harvestId) {
    return BoxApi.getList(page, harvestId);
  },

  getAll() {
    return BoxApi.getAll()
      .then(FromApiConverter.convertBoxList);
  },

  get: (id) => {
    return BoxApi.get(id)
      .then(FromApiConverter.convertBox);
  },

  post: (box) => {
    console.log('IngredientService:post', box);

    return BoxApi.post(box.id, ToApiConverter.convertBox(box))
      .then(FromApiConverter.convertBox);
  },

  put: (box) => {
    console.log('IngredientService:put', box);

    return BoxApi.put(box.id, ToApiConverter.convertBox(box))
            .then(FromApiConverter.convertBox);
  },

  delete: (box, harvestId, page) => {
    console.log('IngredientService:delete', box, harvestId);
    return BoxApi.delete(box.id, harvestId, page);
  },
};

export default BoxService;
