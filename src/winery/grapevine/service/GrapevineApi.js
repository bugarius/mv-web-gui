import {baseApiUrl} from "../../../config";

const apiUrl = baseApiUrl + '/ajax/grapevine';

const initialFormData = {
  grapevine: {},
};

const transformResponse = (res) => {
  console.log('GrapevineApi:transformResponse', res);
  return res.ok ? res.json() :
    res.json().then((e) => {
      throw e;
    });
};

const GrapevineApi = {

  getList: (page) => {
    const url = apiUrl + "?p=" + page;
    console.log("GrapevineApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  getAll: () => {
    const url = apiUrl + "/all";
    console.log("GrapevineApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  get: (id) => {
    const url = apiUrl + '/' + id;
    console.log("GrapevineApi::get", url);

    const action = () => (id === '0') ? Promise.resolve({...initialFormData}) : fetch(url, {
      credentials: 'include',
    }).then(transformResponse);

    return action();
  },

  post: (id, data) => {
    const url = apiUrl + '/' + (id || '');
    console.log('GrapevineApi:post', url, data);

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
    console.log('GrapevineApi:put', url);

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


export default GrapevineApi;
