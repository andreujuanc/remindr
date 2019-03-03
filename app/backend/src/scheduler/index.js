const Agenda = require('agenda');

const logger = require('../logger');
const { MONGO_URL } = process.env;
const connectionOpts = { db: { address: `mongodb://${MONGO_URL}/remindr-agenda`, collection: 'agendaJobs' } };
logger.info(`MongoDb: ${connectionOpts.db.address}`);

const agenda = new Agenda(connectionOpts);

const jobTypes = ['appointment']; //maybe loadthem from filesystem?

jobTypes.forEach(type => {
    require('./jobs/' + type)(agenda);
});

if (jobTypes.length) {
    agenda.start(); // Returns a promise, which should be handled appropriately
}
agenda.on('ready', function () {
    logger.info('Agenda is ready')
    agenda.now('appointment');
});

const scheduler = {
    getAppointments: async () => {
        logger.info('getAppointments - starting');
        const jobs = await agenda.jobs({ lastFinishedAt: null });
        logger.info(`getAppointments: got ${jobs.length} jobs.`);
        return jobs;
    },
    create: (time, data) => {
        agenda.schedule(time, 'appointment', data)
    }
}

module.exports = scheduler;