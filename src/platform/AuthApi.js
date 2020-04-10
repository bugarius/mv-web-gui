const apiUrl = '/auth';

const transformResponse = (res) => {
  console.log('AuthApi:transformResponse', res);
  return res.ok ? res.json() :
    res.json().then((e) => {
      throw e;
    });
};

export const AuthApi = {

  get: () => {
    console.log('AuthApi::get', apiUrl);

    return fetch(apiUrl, {
      credentials: 'include'
    })
      .then(transformResponse);
  },

  login: (login, password) => {
    console.log('AuthApi::login', apiUrl);

    return fetch(apiUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login: login, password: password})
    }).then(transformResponse);
  },

  logout: () => {
    console.log('AuthApi::logout', apiUrl);

    return fetch(apiUrl, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    }).then(transformResponse)
  },

  recover: (login) => {
    const url = apiUrl + '/requestResetPassword';
    console.log('AuthApi::recover', url);

    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login: login, password: ''})
    }).then(transformResponse)
  },

  validate: (token) => {
    const url = apiUrl + '/resetPassword/' + token;
    console.log('AuthApi::recover', url);
    return fetch(url, {
      credentials: 'include'
    }).then(transformResponse);
  },

  reset: (token, password) => {
    const url = apiUrl + '/resetPassword';
    console.log('AuthApi::reset', url);

    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token, newPassword: password})
    }).then(transformResponse)
  }
};