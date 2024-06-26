const assert = require('assert');

const Validator = require('../index');

let schema = {
	dateSend: {
		type: Validator.DATE,
		format: 'DD/MM/YYYY',
		min: '01/01/2020',
		max: '31/12/2020',
		required: true
	},
	dateBirth: {
		type: Validator.DATE,
		minAge: {
			years: 14,
			mounths: 5
		},
		maxAge: {
			years: 99
		}
	}
};

describe('DATE', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2020',
			dateBirth: '2000-08-07'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With not a date', async() => {
		const result = await Validator.validate(schema, {
			dateSend: 11,
			dateBirth: '2000-08-07'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 3);
	});

	it('With an incorrect format', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2020',
			dateBirth: '07/08/2000'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With min not in incorrect format', async() => {
		const result = await Validator.validate({
			dateSend: {
				type: Validator.DATE,
				format: 'DD/MM/YYYY',
				min: '01-01-2020',
				required: true
			}
		}, {
			dateSend: '28/09/2020'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With max not in incorrect format', async() => {
		const result = await Validator.validate({
			dateSend: {
				type: Validator.DATE,
				format: 'DD/MM/YYYY',
				max: '01-01-2020',
				required: true
			}
		}, {
			dateSend: '28/09/2020'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});
	it('With a date not include in range', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2021',
			dateBirth: '2000-08-07'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a too small date', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2020',
			dateBirth: '2018-08-07'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a too big date', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2020',
			dateBirth: '1910-08-07'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('Without parameter', async() => {
		const result = await Validator.validate(schema, {});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 2);
	});

	it('With a not required parameter', async() => {
		const result = await Validator.validate({
			dateSend: {
				type: Validator.DATE,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});