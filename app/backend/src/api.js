const polka = require('polka');
const bodyParser = require('body-parser');
const send = require('@polka/send-type');

const logger = require('./logger')
const scheduler = require('./scheduler/index');

module.exports = polka()
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
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
        try {
            const when = req.body.when;
            const event = req.body.event;
            const appointment = scheduler.create(when, event);
            send(res, 200, appointment);
            logger.info(`Appointment: Scheduled`);
        } catch (ex) {
            logger.error(ex)
        }
    })

