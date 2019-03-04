const Agenda = require('agenda');

const logger = require('../logger');
const { MONGO_URL } = process.env;
const connectionOpts = { db: { address: `mongodb://${MONGO_URL}/remindr-agenda`, collection: 'agendaJobs' } };
logger.info(`MongoDb: ${connectionOpts.db.address}`);

const agenda = new Agenda(connectionOpts);

const jobTypes = ['appointment']; //TODO: maybe loadthem from filesystem? or just hardcode it?

jobTypes.forEach(type => {
    agenda.define(type, require('./jobs/' + type));
});

if (jobTypes.length) {
    agenda.start(); // Returns a promise, which should be handled appropriately
}
agenda.on('ready', function () {
    logger.info('Agenda is ready')
});

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

const scheduler = {
    getAppointments: async () => {
        logger.info('scheduler.getAppointments - starting');
        const jobs = await agenda.jobs({ lastFinishedAt: null });
        logger.info(`scheduler.getAppointments: got ${jobs.length} jobs.`);
        return jobs;
    },
    create: (when, event) => {
        logger.info('scheduler.create - starting');
        if (!when) {
            throw new Error('Parameter not found: "when" is mandatory')
        }
        else if (!isValidDate(new Date(when))) {
            throw new Error('Parameter "when" must be a valid ISO date')
        }
        else if (new Date(when) < Date.now() + 1) {
            throw new Error('Parameter "when" must not be a past date')
        }

        if (!event) {
            throw new Error('Parameter not found: "event" is mandatory')
        }
        else if(typeof event !== 'string'){
            throw new Error('Parameter "event" must be a string')
        }
        agenda.schedule(when, 'appointment', { event })
        logger.info(`scheduler.create - starting: ${when} - ${event}`);
    }
}

module.exports = scheduler;