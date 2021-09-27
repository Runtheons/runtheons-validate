const assert = require('assert');

const Validator = require('../index');

var schema = {
	id: {
		type: Validator.INTEGER,
		min: 0,
		max: 1000,
		required: true
	}
};

describe('INTEGER', function() {
	test('Example', async() => {
		const result = await Validator.validate(schema, { id: 1 });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	test('With not an integer', async() => {
		const result = await Validator.validate(schema, { id: '1' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a bigger number', async() => {
		const result = await Validator.validate(schema, { id: 10000 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a lower number', async() => {
		const result = await Validator.validate(schema, { id: -50 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});