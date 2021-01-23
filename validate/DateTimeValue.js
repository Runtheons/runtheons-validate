const DateValue = require("./DateValue");

module.exports = new class DateTimeValue extends DateValue {

	constructor() {
		super();
		this.format = "YYYY-MM-DD HH:mm:ss";
	}

}