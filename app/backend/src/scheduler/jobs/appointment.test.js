const appointment = require('./appointment');
const logger = require('../../logger');
jest.mock('../../logger')
describe('job > appointment', () => {
    test('execution', () => {
        const done = jest.fn();
        appointment(null, done);
        expect(done).toBeCalledTimes(1);
        expect(logger.info).toBeCalledTimes(1);
    });
})