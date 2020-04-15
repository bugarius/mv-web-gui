import log from 'loglevel';

const transformResponse = (res) => {
    log.debug('AgreementApi:transformResponse', res);
    return res.ok ? res.text() :
            res.text().then((e) => {
                throw e;
            });
};

const ErrorApi = {

    post: (error) => {
        const url = '/error';
        log.debug('Error:postError', url);

        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(error)
        }).then(transformResponse);
    },
};


export default ErrorApi;
