const AbstractValue = require("./AbstractValue");

class NumberValue extends AbstractValue {

	constructor() {
		super();
}

exports.int = new class intData extends NumberValue {

	}

exports.float = new class floatData extends NumberValue {}

exports.double = new class doubleData extends NumberValue {}