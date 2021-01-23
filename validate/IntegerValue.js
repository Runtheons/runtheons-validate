const NumberValue = require("./FloatValue");

module.exports = new class IntegerValue extends NumberValue {

	type(key, requiredValue, dataValue) {
		if (typeof dataValue != "number") {
			return [key + " is not a number"];
		}
		if (dataValue % 1 != 0) {
			return [key + " is not an integer"];
		}
		return [];
	}

}