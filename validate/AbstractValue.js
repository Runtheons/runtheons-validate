module.exports = class AbstractValue {
	constructor() {
		this.avaibleAttributes = ['type', 'min', 'max'];
	}

	validate(key, schema, value) {
		var errors = [];

		var required = schema.required != undefined ? schema.required : true;

		if (value == undefined) {
			if (required) {
				return [key + ' is required'];
			} else {
				return [];
			}
		}

		Object.keys(schema).forEach((attribute) => {
			if (this.avaibleAttributes.includes(attribute)) {
				var err = this[attribute](key, schema[attribute], value);
				errors = errors.concat(err);
			}
		});
		return errors;
	}

	min(key, requiredValue, dataValue) {
		if (dataValue <= requiredValue) {
			return key + ' is lower than ' + requiredValue;
		}
		return [];
	}

	max(key, requiredValue, dataValue) {
		if (dataValue >= requiredValue) {
			return key + ' is greater than ' + requiredValue;
		}
		return [];
	}
};