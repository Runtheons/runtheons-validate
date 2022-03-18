const assert = require('assert');

const Validator = require('../index');

var schema = {
	username: {
		type: Validator.STRING,
		notEmpty: true,
		minLength: 8,
		maxLength: 150,
		reg: '[a-zA-Z]*',
		required: true
	}
};

describe('STRING', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, {
			username: 'ZexalIsMyUsername'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With not a string', async() => {
		const result = await Validator.validate(schema, { username: 1 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 2);
	});

	it('With an empty string', async() => {
		const result = await Validator.validate(schema, { username: '' });
		console.log(result);
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 2);
	});

	it('With a too short string', async() => {
		const result = await Validator.validate(schema, { username: 'a' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a too long string', async() => {
		const result = await Validator.validate(schema, {
			username: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With not a alphabetic string', async() => {
		const result = await Validator.validate(schema, {
			username: 'Zexal0807'
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
			username: {
				type: Validator.STRING,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});