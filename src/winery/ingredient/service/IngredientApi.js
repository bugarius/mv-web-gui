import {baseApiUrl} from "../../../config";

const apiUrl = baseApiUrl + '/ajax/ingredient';

const initialFormData = {
  ingredient: {},
};

const transformResponse = (res) => {
  console.log('IngredientApi:transformResponse', res);
  return res.ok ? res.json() :
    res.json().then((e) => {
      throw e;
    });
};

const IngredientApi = {

  getList: (page, wineId) => {
    const url = apiUrl + "/list?p=" + page;
    console.log("IngredientApi::getList", url, wineId);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  getAll: (type) => {
    const url = apiUrl + "/all" + (type ? `?t=${type}` : '');
    console.log("IngredientApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  get: (id) => {
    const url = apiUrl + '/' + id;
    console.log("IngredientApi::get", url);

    const action = () => (id === '0') ? Promise.resolve({...initialFormData}) : fetch(url, {
      credentials: 'include',
    }).then(transformResponse);

    return action();
  },

  post: (id, data) => {
    const url = apiUrl + '/' + (id || '') + "?wineId=" + null;
    console.log('IngredientApi:post', url, data);

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
    console.log('IngredientApi:put', url);

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

  delete: (id, wineId, page) => {
    const url = apiUrl + '/' + (wineId || '') + '/' + (id || '') + "?p=" + page;

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


export default IngredientApi;
