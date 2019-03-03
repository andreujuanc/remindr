const polka = require('polka');
const bodyParser = require('body-parser');
const send = require('@polka/send-type');

const logger = require('./logger')
const scheduler = require('./scheduler/index');

module.exports = polka()
    //.use(bodyParser)
    .get('/', (req, res) => {
        send(res, 200, { name: 'john' });
    })
    .post('/', (req, res) => {
        logger.info(`Scheduling new appointment ${req.hello}`);

        res.end({

        });
    })

