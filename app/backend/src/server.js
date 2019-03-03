const polka = require('polka');
const logger = require('./logger');
const agenda = require('./scheduler');

logger.info('Starting Remindr')

const { PORT=3000, NODE_ENV, OMG } = process.env;
const dev = NODE_ENV !== 'production';
logger.info(`TESTING ENV VARS: ${OMG}`)

polka()
    require('./api') //NO NEED TO MOUNT 
    .listen(PORT, err => {
        if (err) throw err;
        logger.info(`Running on port ${PORT}`);
    });