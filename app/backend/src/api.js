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
        logger.info(`Appointment: Scheduling`);
        const appointment = scheduler.create('not yet from request');
        send(res, 200, appointment);
        logger.info(`Appointment: Scheduled`);
    })

