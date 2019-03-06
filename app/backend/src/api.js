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
    .use(async (req, res, next) => {
        logger.info(`${req.method} API /scheduler START`);
        const a = await next();
        logger.info(`${req.method} API /scheduler END`);
    })
    .get('/', async (req, res) => {
        const list = await scheduler.getAppointments()
            .catch(err => {
                logger.error('GET API /scheduler');
                send(res, 404);
            });
        send(res, 200, list);
    })
    .post('/', (req, res) => {
        try {
            const when = req.body.when;
            const event = req.body.event;
            const appointment = scheduler.create(when, event);
            send(res, 200, appointment);
        } catch (ex) {
            logger.error(ex)
            send(res, 500, { message: ex.message });
        }
    });