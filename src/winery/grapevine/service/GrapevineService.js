
import GrapevineApi from "./GrapevineApi";
import {FromApiConverter, ToApiConverter} from "../../../services/Converters";

const GrapevineService = {
  getList(page) {
    return GrapevineApi.getList(page);
  },

  getAll() {
    return GrapevineApi.getAll()
            .then(FromApiConverter.convertGrapevineList);
  },

  get: (id) => {
    return GrapevineApi.get(id)
      .then(FromApiConverter.convertGrapevine);
  },

  post: (grapevine) => {
    console.log('GrapevineService:post', grapevine);

    return GrapevineApi.post(grapevine.id, ToApiConverter.convertGrapevine(grapevine))
      .then(FromApiConverter.convertGrapevine);
  },

  put: (grapevine) => {
    console.log('GrapevineService:put', grapevine);

    return GrapevineApi.put(grapevine.id, ToApiConverter.convertGrapevine(grapevine))
            .then(FromApiConverter.convertGrapevine);
  },

  delete: (grapevine, page) => {
    console.log('GrapevineService:delete', grapevine);
    return GrapevineApi.delete(grapevine.id, page);
  },
};

export default GrapevineService;
