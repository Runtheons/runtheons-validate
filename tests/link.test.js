const assert = require('assert');

const Validator = require('../index');

var schema = {
	link: {
		type: Validator.LINK,
		required: true
	}
};

describe('LINK', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, {
			link: 'https://www.runtheons.com'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With an incorrect parameter', async() => {
		const result = await Validator.validate(schema, {
			link: 'aaaa@aaa.com'
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
			link: {
				type: Validator.LINK,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});