const logger = require('../../logger');
module.exports = function (agenda) {
  agenda.define('appointment', (job, done) => {
      logger.info('Executing Appointment job');
      return done();
  });
};