const polka = require('polka');
const logger = require('./logger');

logger.info('Starting Remindr')

const { PORT=3000, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

polka()
    require('./api') //NO NEED TO MOUNT 
    .listen(PORT, err => {
        if (err) throw err;
        logger.info(`Running on port ${PORT}`);
    });