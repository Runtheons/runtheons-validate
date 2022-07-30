const assert = require('assert');

const Validator = require('../index');

var schema = {
	price: {
		type: Validator.FLOAT,
		min: 1,
		max: 100,
		required: true
	}
};

describe('FLOAT', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, { price: 10.0 });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With not an float', async() => {
		const result = await Validator.validate(schema, { price: '2' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With an equals number', async() => {
		const result = await Validator.validate(schema, { price: 1.0 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a bigger number', async() => {
		const result = await Validator.validate(schema, { price: 150 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a lower number', async() => {
		const result = await Validator.validate(schema, { price: 0 });
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
			price: {
				type: Validator.FLOAT,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});