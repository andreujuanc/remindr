const polka = require('polka');
const bodyParser = require('body-parser');
const send = require('@polka/send-type');

const logger = require('./logger')
const scheduler = require('./scheduler/index');
/*
    Exposing two APIs verbs
*/
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
    /*
      GET: retrieves all the upcomming appointments
    */
    .get('/', async (req, res) => {
        //Somehow this is how things roll in polka async json results
        const list = await scheduler.getAppointments()
            .catch(err => {
                logger.error('GET API /scheduler');
                send(res, 404);
            });
        send(res, 200, list);
    })
    /*
        POST: schedules a new appointment
        Content-Type: application/json
        body: { when: "<ISO_format_string>", event: "<freeform_string>" } }
    */
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