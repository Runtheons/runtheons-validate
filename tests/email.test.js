const assert = require('assert');

const Validator = require('../index');

let schema = {
	email: {
		type: Validator.EMAIL,
		required: true
	}
};

describe('EMAIL', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, {
			email: 'zexal0807@gmail.com'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With an incorrect parameter', async() => {
		const result = await Validator.validate(schema, {
			email: 'zexal0807#gmail.com'
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
			email: {
				type: Validator.EMAIL,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});