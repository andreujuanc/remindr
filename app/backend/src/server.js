const polka = require('polka');
const logger = require('./logger');
const api = require('./api');

logger.info('Starting Remindr')

const { PORT = 3000, NODE_ENV, OMG, DOCKER_IMAGE_TAG = 'notset' } = process.env;
/**
 * Simple polka server with two endpoints
 * one for the scheduler
 * and a / (home) for health checks, maybe must be changed to /hc or /health
 * Most of the fucntionality is inside the scheduler folder, the rest of the code is just plumbing.
 */
polka()
    .use('/scheduler', api)
    .get('/', (req, res) => {
        res.end(`OK! - DOCKER_IMAGE_TAG: ${DOCKER_IMAGE_TAG} - Time: ${new Date().toISOString()}`);
    })
    .listen(PORT, err => {
        if (err) {
            logger.error(err);
            throw err;
        }
        logger.info(`Running on port ${PORT}`);
    });