const AbstractValue = require('./AbstractValue');

module.exports = new(class BooleanValue extends AbstractValue {
	constructor() {
		super();
		this.avaibleAttributes = ['type'];
	}

	type(key, requiredValue, dataValue) {
		if (typeof dataValue != 'boolean') {
			return [key + ' is not a boolean'];
		}
		return [];
	}
})();