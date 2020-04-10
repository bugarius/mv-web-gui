import {baseApiUrl} from "../../../config";

const apiUrl = baseApiUrl + '/ajax/parcels';

const initialFormData = {
  parcel: {},
};

const transformResponse = (res) => {
  console.log('ParcelApi:transformResponse', res);
  return res.ok ? res.json() :
    res.json().then((e) => {
      throw e;
    });
};

const ParcelApi = {

  getList: (page) => {
    const url = apiUrl + "?p=" + page;
    console.log("ParcelApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  getAll: () => {
    const url = apiUrl + "/all";
    console.log("ParcelApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  get: (id) => {
    const url = apiUrl + '/' + id;
    console.log("ParcelApi::get", url);

    const action = () => (id === '0') ? Promise.resolve({...initialFormData}) : fetch(url, {
      credentials: 'include',
    }).then(transformResponse);

    return action();
  },

  post: (id, data) => {
    const url = apiUrl + '/' + (id || '');
    console.log('ParcelApi:post', url, data);

    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(transformResponse);
  },

  put: (id, data) => {
    const url = apiUrl + '/' + (id || '');
    console.log('ParcelApi:put', url);

    return fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(transformResponse)
  },

  delete: (id, page) => {
    const url = apiUrl + '/' + (id || '') + "?p=" + page;

    return fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(transformResponse);
  },
};


export default ParcelApi;
