const assert = require('assert');

const Validator = require('../index');

var schema = {
	ids: {
		type: Validator.ARRAY,
		of: {
			type: Validator.INTEGER,
			required: true
		},
		required: true
	}
};

describe('ARRAY', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, { ids: [1] });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it("With out 'of' params", async() => {
		const result = await Validator.validate({
			ids: {
				type: Validator.ARRAY,
				required: true
			}
		}, { ids: [] });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Not an array', async() => {
		const result = await Validator.validate(schema, { ids: {} });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});