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
	test('Example', async() => {
		const result = await Validator.validate(schema, {
			username: 'ZexalIsMyUsername'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	test('With not a string', async() => {
		const result = await Validator.validate(schema, { username: 1 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 2);
	});

	test('With an empty string', async() => {
		const result = await Validator.validate(schema, { username: '' });
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
});