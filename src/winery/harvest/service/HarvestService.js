import HarvestApi from "./HarvestApi";
import {FromApiConverter, ToApiConverter} from "../../../services/Converters";

const HarvestService = {
  getList(page) {
    return HarvestApi.getList(page);
  },

  getAll() {
    return HarvestApi.getAll()
      .then(FromApiConverter.convertHarvestList);
  },

  get: (id) => {
    return HarvestApi.get(id)
      .then(FromApiConverter.convertHarvest);
  },

  post: (harvest) => {
    console.log('HarvestService:post', harvest);

    return HarvestApi.post(harvest.id, ToApiConverter.convertHarvest(harvest))
      .then(FromApiConverter.convertHarvest);
  },

  put: (harvest) => {
    console.log('HarvestService:put', harvest);

    return HarvestApi.put(harvest.id, ToApiConverter.convertHarvest(harvest))
            .then(FromApiConverter.convertHarvest);
  },

  delete: (harvest, page) => {
    console.log('HarvestService:delete', harvest);
    return HarvestApi.delete(harvest.id, page);
  },
};

export default HarvestService;
