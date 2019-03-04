const scheduler = require('./index');
const agenda = require('agenda');
const winston = require('../logger')
jest.mock('../logger')
jest.mock('agenda')

function inXMinutes(m = 1) {
    const now = new Date();
    now.setUTCMinutes(now.getUTCMinutes() + m)
    return now.toISOString();
}

describe('scheduler', () => {
    it('should throw on insufficient parameters', () => {
        expect(() => scheduler.create(inXMinutes(), null)).toThrow();
        expect(() => scheduler.create(null, 'event text')).toThrow();
        expect(() => scheduler.create(null, null)).toThrow();
    })

    it('should be ok if parameters are correct', () => {
        expect(() => scheduler.create(inXMinutes(), 'event text')).not.toThrow();
    })

    it('should validate date parameters', () => {
        //As per specs, WHEN parameter must be "<ISO_format_string>"
        expect(() => scheduler.create(new Date(), 'event text')).toThrow();

        //dates older than UTC NOW should not be valid
        expect(() => scheduler.create(new Date(2000).toISOString(), 'event text')).toThrow();
    })

    it('should validate event parameters', () => {
        //As per specs, WHEN parameter must be "<freeform_string>"
        expect(() => scheduler.create(new Date(), { a: 1 })).toThrow();
    })
})