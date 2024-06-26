const assert = require('assert');

const Validator = require('../index');

let schema = {
	id: {
		type: Validator.INTEGER,
		min: 0,
		max: 1000,
		required: true,
		parse: Validator.PARSE_INTEGER
	}
};

describe('INTEGER', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, { id: 1 });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With undefined type', async() => {
		const result = await Validator.validate({ id: {} }, { id: '1' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With not a number', async() => {
		const result = await Validator.validate(schema, { id: 'a' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With not a number (parse disable)', async() => {
		const result = await Validator.validate({
			id: {
				type: Validator.INTEGER,
				min: 0,
				max: 1000,
				required: true,
				parse: Validator.NOT_PARSE_INTEGER
			}
		}, { id: 'a' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With not a number (parse disable)', async() => {
		const result = await Validator.validate({
			id: {
				type: Validator.INTEGER,
				min: 0,
				max: 1000,
				required: true,
				parse: Validator.NOT_PARSE_INTEGER
			}
		}, { id: '3a' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With not an integer', async() => {
		const result = await Validator.validate(schema, { id: 1.5 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a bigger number', async() => {
		const result = await Validator.validate(schema, { id: 10000 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a lower number', async() => {
		const result = await Validator.validate(schema, { id: -50 });
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
			id: {
				type: Validator.INTEGER,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});