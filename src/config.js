import * as log from 'loglevel'

const devEnv = (process.env.NODE_ENV === 'development');
devEnv ? log.setLevel('DEBUG') : log.setLevel('ERROR');