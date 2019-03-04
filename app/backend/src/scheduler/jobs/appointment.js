const logger = require('../../logger');

const appointment = (job, done) => {
  const data = (job && job.attrs && job.attrs.data) || {};
  logger.info('Executing Appointment job', data);
  return done();
};

module.exports = appointment;