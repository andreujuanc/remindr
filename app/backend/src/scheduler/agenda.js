const logger = require('../logger');
const Agenda = require('agenda');

const { DATABASE_HOST, DATABASE_PORT } = process.env;
const connectionOpts = { db: { address: `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/remindr-agenda`, collection: 'agendaJobs' } };
logger.info(`MongoDb: ${connectionOpts.db.address}`);

module.exports = function () {
    const agenda = new Agenda(connectionOpts);
    agenda.define('appointment', require('./jobs/appointment'));
    agenda.start(); // Returns a promise, which should be handled appropriately
    agenda.on('ready', function () {
        logger.info('Agenda is ready')
    });

    return agenda
};