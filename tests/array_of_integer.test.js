const assert = require('assert');

const Validator = require('../index');

var schema = {
	ids: {
		type: Validator.ARRAY_OF_INTEGER,
		required: true
	}
};

describe('ARRAY OF INTEGER', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, { ids: [1, 2] });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('Not an array', async() => {
		const result = await Validator.validate(schema, { ids: {} });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});