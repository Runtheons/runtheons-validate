const assert = require('assert');

const Validator = require('../index');

let schema = {
	timeSend: {
		type: Validator.TIME,
		format: 'HH:mm:ss',
		min: '00:00:00',
		max: '11:00:00',
		required: true // Could be omitted
	}
};

describe('TIME', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, {
			timeSend: '10:10:29'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With not a time', async() => {
		const result = await Validator.validate(schema, {
			timeSend: 11
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 3);
	});

	it('With an incorrect format', async() => {
		const result = await Validator.validate(schema, {
			timeSend: '10-10-29'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 3);
	});

	it('With a date not include in range', async() => {
		const result = await Validator.validate(schema, {
			timeSend: '15:10:29'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a not required parameter', async() => {
		const result = await Validator.validate({
			timeSend: {
				type: Validator.TIME,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});