const FloatValue = require('./FloatValue');

module.exports = class IntegerValue extends FloatValue {

	parse = true;

	validate(key, schema, value) {
		if (schema.parse != undefined)
			this.parse = schema.parse;
		return super.validate(key, schema, value);
	}

	type(key, requiredValue, dataValue) {
		if (typeof dataValue != 'number') {
			if (this.parse) {
				let old = dataValue;
				dataValue = parseFloat(dataValue);
				if ("" + dataValue != old) {
					return [key + ' is not a number'];
				}
			}
		}
		if (dataValue % 1 != 0) {
			return [key + ' is not an integer'];
		}
		return [];
	}
};