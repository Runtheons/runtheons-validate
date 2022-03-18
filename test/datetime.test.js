const assert = require('assert');

const Validator = require('../index');

var schema = {
	dateSend: {
		type: Validator.DATETIME,
		format: 'DD/MM/YYYY HH:mm:ss',
		min: '01/01/2020 00:10:30',
		max: '31/12/2020 05:30:00',
		required: true
	},
	dateBirth: {
		type: Validator.DATETIME,
		minAge: {
			years: 14,
			mounths: 5,
			hours: 1
		},
		maxAge: {
			years: 99,
			hours: 10
		}
	}
};

describe('DATETIME', function() {
	it('Example', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2020 15:10:29',
			dateBirth: '2000-08-07 08:30:56'
		});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});

	it('With not a datetime', async() => {
		const result = await Validator.validate(schema, {
			dateSend: 11,
			dateBirth: '2000-08-07 08:30:56'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 3);
	});

	it('With an incorrect format', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2020 15:10:29',
			dateBirth: '07/08/2000 08:30:56'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a date not include in range', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2021 15:10:29',
			dateBirth: '2000-08-07 08:30:56'
		});
		assert.equal(result.status, false);
		assert.equal(result.errors.length, 1);
	});

	it('With a too small datetime', async() => {
		const result = await Validator.validate(schema, {
			dateSend: '28/09/2020 15:10:29',
			dateBirth: '2018-08-07 08:30:56'
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
				type: Validator.DATETIME,
				required: false
			}
		}, {});
		assert.equal(result.status, true);
		assert.equal(result.errors.length, 0);
	});
});