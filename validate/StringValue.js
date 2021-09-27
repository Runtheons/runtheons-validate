const AbstractValue = require('./AbstractValue');

module.exports = new(class StringValue extends AbstractValue {
	constructor() {
		super();
		this.avaibleAttributes = [
			'type',
			'notEmpty',
			'maxLength',
			'minLength',
			'reg'
		];
	}

	type(key, requiredValue, dataValue) {
		if (typeof dataValue != 'string') {
			return [key + ' is not a string'];
		}
		return [];
	}

	notEmpty(key, requiredValue, dataValue) {
		if (requiredValue) {
			if (dataValue.length == 0) return [key + " can't be empty"];
		}
		return [];
	}

	maxLength(key, requiredValue, dataValue) {
		if (dataValue.length > requiredValue) {
			return [key + ' length is greater than ' + requiredValue];
		}
		return [];
	}

	minLength(key, requiredValue, dataValue) {
		if (dataValue.length < requiredValue) {
			return [key + ' length is lower than ' + requiredValue];
		}
		return [];
	}

	reg(key, requiredValue, dataValue) {
		var reg = new RegExp(requiredValue);
		if (reg.exec(dataValue) != null) {
			return [];
		}
		return [key + " don't match the reg " + reg];
	}
})();