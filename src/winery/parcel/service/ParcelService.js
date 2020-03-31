
import ParcelApi from "./ParcelApi";
import {FromApiConverter, ToApiConverter} from "../../../services/Converters";

const ParcelService = {
  getList(page) {
    return ParcelApi.getList(page);
  },

  getAll() {
    return ParcelApi.getAll()
      .then(FromApiConverter.convertParcelList);
  },

  get: (id) => {
    return ParcelApi.get(id)
      .then(FromApiConverter.convertParcel);
  },

  post: (parcel) => {
    console.log('ParcelService:post', parcel);

    return ParcelApi.post(parcel.id, ToApiConverter.convertParcel(parcel))
      .then(FromApiConverter.convertParcel);
  },

  put: (parcel) => {
    console.log('ParcelService:put', parcel);

    return ParcelApi.put(parcel.id, ToApiConverter.convertParcel(parcel))
            .then(FromApiConverter.convertParcel);
  },

  delete: (parcel, page) => {
    console.log('ParcelService:delete', parcel);
    return ParcelApi.delete(parcel.id, page);
  },
};

export default ParcelService;
