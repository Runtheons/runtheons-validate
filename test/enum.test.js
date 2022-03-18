const assert = require('assert');

const Validator = require('../index');

var schema1 = {
	sex: {
		type: Validator.ENUM,
		values: ['M', 'F'],
		required: true
	}
};

describe('ENUM of STRING', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema1, { sex: 'M' });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it("With out 'values' params", async() => {
		const result = await Validator.validate({
			sex: {
				type: Validator.ENUM,
				required: true
			}
		}, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With undefined required params', async() => {
		const result = await Validator.validate({
			sex: {
				type: Validator.ENUM,
				values: ['M', 'F']
			}
		}, { sex: 'M' });
		console.log(result);
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it("With 'values' params not an array", async() => {
		const result = await Validator.validate({
			sex: {
				type: Validator.ENUM,
				values: { 0: 'M', 1: 'F' },
				required: true
			}
		}, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema1, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a not required parameter', async() => {
		const result = await Validator.validate({
			valid: {
				type: Validator.ENUM,
				values: ['M', 'F'],
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With invalid value', async() => {
		const result = await Validator.validate(schema1, { sex: 'X' });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});

var schema2 = {
	valid: {
		type: Validator.ENUM,
		values: [0, 1],
		required: true
	}
};

describe('ENUM of INTEGER', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema2, { valid: 1 });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it("With out 'values' params", async() => {
		const result = await Validator.validate({
			sex: {
				type: Validator.ENUM,
				required: true
			}
		}, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it("With 'values' params not an array", async() => {
		const result = await Validator.validate({
			sex: {
				type: Validator.ENUM,
				values: { 0: 0, 1: 1 },
				required: true
			}
		}, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema2, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a not required parameter', async() => {
		const result = await Validator.validate({
			valid: {
				type: Validator.ENUM,
				values: [0, 1],
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With invalid value', async() => {
		const result = await Validator.validate(schema1, { sex: 2 });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
});