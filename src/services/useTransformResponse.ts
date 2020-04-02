import * as log from 'loglevel'

const useTransformResponse = (res) => {
        log.info('useTransformResponse', res);
        return res.ok ? res.json() :
            res.json().then((e) => {
                throw e;
            });
};

export default useTransformResponse;