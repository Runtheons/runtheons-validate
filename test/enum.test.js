const assert = require('assert');

const Validator = require('../index');

var schema = {
	sex: {
		type: Validator.ENUM,
		of: Validator.STRING,
		values: ['M', 'F'],
		required: true
	}
};

describe('ENUM of STRING', function() {
	test('Example', async() => {
		const result = await Validator.validate(schema, { sex: 'M' });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	test('With not an string', async() => {
		const result = await Validator.validate(schema, { sex: 1 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});

schema = {
	valid: {
		type: Validator.ENUM,
		of: Validator.INTEGER,
		values: [0, 1],
		required: true
	}
};

describe('ENUM of INTEGER', function() {
	test('Example', async() => {
		const result = await Validator.validate(schema, { valid: 1 });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	test('With not an string', async() => {
		const result = await Validator.validate(schema, { valid: 'M' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});