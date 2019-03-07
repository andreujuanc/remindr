const logger = require('../logger');
const Agenda = require('agenda');

/* Didnt have time to do something better with all this */
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME = 'remindr-agenda' } = process.env;
const DBAUTH = typeof DATABASE_USER !== 'undefined' ? `${DATABASE_USER}:${DATABASE_PASSWORD}@` : '';
const connectionOpts = { db: { address: `mongodb://${DBAUTH}${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, collection: 'agendaJobs' } };

logger.info(`MongoDb: ${connectionOpts.db.address}`);
/**
 * Simple function that defines the jobs and starts agenda
 * There is no much to it
 */
module.exports = function () {
    const agenda = new Agenda(connectionOpts);
    agenda.define('appointment', require('./jobs/appointment'));
    agenda.start(); // Returns a promise, which should be handled appropriately
    agenda.on('ready', function () {
        logger.info('Agenda is ready')
    });

    return agenda
};