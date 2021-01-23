const AbstractValue = require("./AbstractValue");

module.exports = new class FloatValue extends AbstractValue {
	constructor() {
		super();
		this.avaibleAttributes = ["min", "max", "type"];
	}
	type(key, requiredValue, dataValue) {
		if (typeof dataValue != "number") {
			return [key + " is not a number"];
		}
		return [];
	}
}