const assert = require('assert');

const Validator = require('../index');

var schema = {
	user: {
		type: Validator.OBJECT,
		of: {
			id: {
				type: Validator.INTEGER,
				required: true
			}
		},
		required: true
	}
};

describe('OBJECT', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, { user: { id: 1 } });
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it("With out 'of' params", async() => {
		const result = await Validator.validate({
			ids: {
				type: Validator.OBJECT,
				required: true
			}
		}, { ids: [] });
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With required false', async() => {
		const result = await Validator.validate({
			user: {
				type: Validator.OBJECT,
				of: {
					id: {
						type: Validator.INTEGER,
						required: true
					}
				},
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});