import WineApi from "./WineApi";
import {FromApiConverter, ToApiConverter} from "../../../services/Converters";

const WineService = {
  getList(page) {
    return WineApi.getList(page);
  },

  getListByHarvestId(harvestId, page) {
    return WineApi.getListByHarvestId(harvestId, page);
  },

  getAll() {
    return WineApi.getAll()
      .then(FromApiConverter.convertWineList);
  },

  get: (id) => {
    return WineApi.get(id)
      .then(FromApiConverter.convertWine);
  },

  post: (wine) => {
    console.log('WineService:post', wine);

    return WineApi.post(wine.id, ToApiConverter.convertWine(wine))
      .then(FromApiConverter.convertWine);
  },

  put: (wine) => {
    console.log('WineService:put', wine);

    return WineApi.put(wine.id, ToApiConverter.convertWine(wine))
            .then(FromApiConverter.convertWine);
  },

  putIngredient: (wineId, ingredient) => {
    console.log('WineService:putIngredient', wineId, ingredient);

    return WineApi.putIngredient(wineId, ingredient)
            .then(FromApiConverter.convertWine);
  },

  deleteIngredient: (wineId, ingredientAddedId) => {
    console.log('WineService:deleteIngredient', wineId, ingredientAddedId);
    return WineApi.deleteIngredient(wineId, ingredientAddedId);
  },

  delete: (wine, harvest, page) => {
    console.log('WineService:delete', wine);
    return WineApi.delete(wine.id, harvest.id, page);
  },
};

export default WineService;
