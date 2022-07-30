const assert = require('assert');

const Validator = require('../index');

var schema = {
	checked: {
		type: Validator.BOOLEAN,
		required: true
	}
};

describe('BOOLEAN', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, { checked: true });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With not a boolean', async() => {
		const result = await Validator.validate(schema, { checked: 'false' });
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
			checked: {
				type: Validator.BOOLEAN,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});