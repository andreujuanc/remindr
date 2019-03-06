const polka = require('polka');
const logger = require('./logger');
const api = require('./api');

logger.info('Starting Remindr')

const { PORT = 3000, NODE_ENV, OMG, DOCKER_IMAGE_TAG = 'notset' } = process.env;

polka()
    .use('scheduler', api)
    .get('/', (req, res) => {
        res.end(`OK - DOCKER_IMAGE_TAG: ${DOCKER_IMAGE_TAG} - Time: ${new Date().toISOString()}`);
    })
    .listen(PORT, err => {
        if (err) {
            logger.error(err);
            throw err;
        }
        logger.info(`Running on port ${PORT}`);
    });