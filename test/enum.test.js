const assert = require('assert');

const Validator = require('../index');

var schema1 = {
	sex: {
		type: Validator.ENUM,
		values: ['M', 'F'],
		required: true
	}
};

describe('ENUM of STRING', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema1, { sex: 'M' });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema1, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});

var schema2 = {
	valid: {
		type: Validator.ENUM,
		values: [0, 1],
		required: true
	}
};

describe('ENUM of INTEGER', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema2, { valid: 1 });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema2, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});