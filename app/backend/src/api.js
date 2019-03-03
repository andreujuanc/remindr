const polka = require('polka');
const bodyParser = require('body-parser');
const send = require('@polka/send-type');

const logger = require('./logger')
const scheduler = require('./scheduler/index');

module.exports = polka()
    //.use(bodyParser)
    .get('/', async (req, res) => {
        logger.info('GET API /scheduler START');
        const list = await scheduler.getAppointments()
            .catch(err => {
                logger.error('GET API /scheduler');
                send(res, 404);
            });;
        logger.info('GET API /scheduler END');
        send(res, 200, list);
    })
    .post('/', (req, res) => {
        logger.info(`Appointment: Scheduling`);
        const time = 'in 10 seconds';
        const data = '';
        const appointment = scheduler.create(time, data);
        send(res, 200, appointment);
        logger.info(`Appointment: Scheduled`);
    })

