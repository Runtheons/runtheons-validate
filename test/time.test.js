const assert = require('assert');

const Validator = require('../index');

var schema = {
	timeSend: {
		type: Validator.TIME,
		format: 'HH:mm:ss',
		min: '00:00:00',
		max: '11:00:00',
		required: true // Could be omitted
	},
	timeBirth: {
		type: Validator.TIME,
		minAge: {
			hours: 1
		},
		maxAge: {
			hours: 10
		}
	}
};

describe('TIME', function () {
	test('Example', async () => {
		const result = await Validator.validate(schema, {
			timeSend: '10:10:29',
			timeBirth: '08:30:56'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	test('With not a time', async () => {
		const result = await Validator.validate(schema, {
			timeSend: 11,
			timeBirth: '08:30:56'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 3);
	});

	test('With an incorrect format', async () => {
		const result = await Validator.validate(schema, {
			timeSend: '10:10:29',
			timeBirth: '08-30-56'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a date not include in range', async () => {
		const result = await Validator.validate(schema, {
			timeSend: '15:10:29',
			timeBirth: '08:30:56'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a too small time', async () => {
		const result = await Validator.validate(schema, {
			timeSend: '10:10:29',
			timeBirth: '00:30:56'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async () => {
		const result = await Validator.validate(schema, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 2);
	});
});
