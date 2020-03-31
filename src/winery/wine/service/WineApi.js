import {baseApiUrl} from "../../../config";

const apiUrl = baseApiUrl + '/ajax/wine';

const initialFormData = {
  wine: {},
};

const transformResponse = (res) => {
  console.log('WineApi:transformResponse', res);
  return res.ok ? res.json() :
    res.json().then((e) => {
      throw e;
    });
};

const WineApi = {

  getList: (page) => {
    const url = apiUrl + "?p=" + page;
    console.log("WineApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  getListByHarvestId: (harvestId, page) => {
    const url = apiUrl + "/harvest?p=" + page + "&h=" + harvestId;
    console.log("WineApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  getAll: () => {
    const url = apiUrl + "/all";
    console.log("WineApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  get: (id) => {
    const url = apiUrl + '/' + id;
    console.log("WineApi::get", url);

    const action = () => (id === '0') ? Promise.resolve({...initialFormData}) : fetch(url, {
      credentials: 'include',
    }).then(transformResponse);

    return action();
  },

  post: (id, data) => {
    const url = apiUrl + '/' + (id || '');
    console.log('WineApi:post', url, data);

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
    console.log('WineApi:put', url);

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

  putIngredient: (wineId, data) => {
    const url = apiUrl + '/' + (wineId || '') + "/ingredient";
    console.log('WineApi:putIngredient', url);

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

  deleteIngredient: (wineId, ingredientAddedId) => {
    const url = apiUrl + '/' + (wineId || '') + "/ingredient/" + (ingredientAddedId || '');

    return fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(transformResponse);
  },

  delete: (id, harvestId,  page) => {
    const url = apiUrl + '/' + (id || '') + "?p=" + page + "&h=" + harvestId;

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


export default WineApi;
