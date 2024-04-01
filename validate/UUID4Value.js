const StringValue = require('./StringValue');

module.exports = class UUID4Value extends StringValue {
	constructor() {
		super();
		this.avaibleAttributes = ['type'];
	}

	type(key, requiredValue, dataValue) {
		let reg = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;
		if (!reg.test(dataValue)) {
			return [key + ' is not a uuidV4'];
		}
		return [];
	}
};