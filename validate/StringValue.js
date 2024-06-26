const AbstractValue = require('./AbstractValue');

module.exports = class StringValue extends AbstractValue {
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
		if (requiredValue && dataValue.length == 0) {
			return [key + " can't be empty"];
		}
		return [];
	}

	minLength(key, requiredValue, dataValue) {
		if (dataValue.length <= requiredValue) {
			return [key + ' length is lower than ' + requiredValue];
		}
		return [];
	}

	maxLength(key, requiredValue, dataValue) {
		if (dataValue.length >= requiredValue) {
			return [key + ' length is greater than ' + requiredValue];
		}
		return [];
	}

	reg(key, requiredValue, dataValue) {
		let reg = new RegExp(requiredValue);
		let executed = reg.exec(dataValue);
		if (executed != null && executed[0] == dataValue) {
			return [];
		}
		return [key + " don't match the reg " + reg];
	}
};