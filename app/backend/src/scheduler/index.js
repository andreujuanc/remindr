const logger = require('../logger');
const createAgenda = require('./agenda');

const agenda = createAgenda();

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
/**
 * Scheduler
 * creates and retrieves appointments
 */
const scheduler = {
    /**
     * Retrieves all appointments
     * 
     * @async
     * @return {Promise<Array>} Array of appointments
     */
    getAppointments: async () => {
        logger.info('scheduler.getAppointments - starting');
        const jobs = await agenda.jobs({ lastFinishedAt: null });
        logger.info(`scheduler.getAppointments: got ${jobs.length} jobs.`);
        return jobs;
    },
    /**
     * Creates an appointment
     * 
     * @async
     * @param {string} when - ISO date of when the appointment will be scheduled on
     * @param {string} event - Free form string. Event description
     * @return {Promise<object>} Created appointment
     */
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
        else if (typeof event !== 'string') {
            throw new Error('Parameter "event" must be a string')
        }
        const appointment = agenda.schedule(when, 'appointment', { event })
        logger.info(`scheduler.create - starting: ${when} - ${event}`);
        return appointment;
    }
}

module.exports = scheduler;