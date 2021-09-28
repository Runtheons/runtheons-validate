const AbstractValue = require('./AbstractValue');

module.exports = class FloatValue extends AbstractValue {
	constructor() {
		super();
		this.avaibleAttributes = ['type', 'min', 'max'];
	}

	type(key, requiredValue, dataValue) {
		if (typeof dataValue != 'number') {
			return [key + ' is not a number'];
		}
		return [];
	}
};
