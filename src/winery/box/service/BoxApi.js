import {baseApiUrl} from "../../../config";

const apiUrl = baseApiUrl + '/ajax/box';

const initialFormData = {
  box: {},
};

const transformResponse = (res) => {
  console.log('BoxApi:transformResponse', res);
  return res.ok ? res.json() :
    res.json().then((e) => {
      throw e;
    });
};

const BoxApi = {

  getList: (page, harvestId) => {
    const url = apiUrl + (harvestId ? "/" + harvestId : "") + "?p=" + page;
    console.log("BoxApi::getList", url, harvestId);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  getAll: () => {
    const url = apiUrl + "/all";
    console.log("BoxApi::get", url);

    return fetch(url, {
      credentials: 'include',
    }).then(transformResponse)
  },

  get: (id) => {
    const url = apiUrl + '/' + id;
    console.log("BoxApi::get", url);

    const action = () => (id === '0') ? Promise.resolve({...initialFormData}) : fetch(url, {
      credentials: 'include',
    }).then(transformResponse);

    return action();
  },

  post: (id, data) => {
    const url = apiUrl + '/' + (id || '');
    console.log('BoxApi:post', url, data);

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
    console.log('BoxApi:put', url);

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

  delete: (id, harvestId, page) => {
    const url = apiUrl + '/' + (harvestId || '') + '/' + (id || '') + "?p=" + page;

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


export default BoxApi;
