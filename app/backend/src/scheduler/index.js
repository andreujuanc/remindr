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

const scheduler = {
    getAppointments: async () => {
        logger.info('scheduler.getAppointments - starting');
        const jobs = await agenda.jobs({ lastFinishedAt: null });
        logger.info(`scheduler.getAppointments: got ${jobs.length} jobs.`);
        return jobs;
    },
    create: (when, event) => {
        logger.info('scheduler.create - starting');
        agenda.schedule(when, 'appointment', event)
        logger.info(`scheduler.create - starting: ${when} - ${event}`);
    }
}

module.exports = scheduler;