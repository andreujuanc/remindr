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
agenda.on('ready', function(){
    logger.info('Agenda is ready')
    agenda.now('appointment');
});

const scheduler = {
    create: (data)=>{
        agenda.schedule('in 1 minute', 'appointment', data)
    }
}

module.exports = scheduler;