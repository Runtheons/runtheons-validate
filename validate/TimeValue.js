const DateValue = require("./DateValue");

module.exports = new class TimeValue extends DateValue {

	constructor() {
		super();
		this.format = "HH:mm:ss";
	}

}