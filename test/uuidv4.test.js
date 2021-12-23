const assert = require('assert');

const Validator = require('../index');

var schema = {
	uuidV4: {
		type: Validator.UUIDV4,
		required: true
	}
};

describe('UUIDV4', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, {
			uuidV4: 'a1a2a3a4-a1a2-a1a2-a1a2-a1a2a3a4a5a6'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});