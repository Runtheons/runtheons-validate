const DateValue = require("./DateValue").constructor;

module.exports = new(class DateTimeValue extends DateValue {
	constructor() {
		super();
		this.format = "YYYY-MM-DD HH:mm:ss";
	}
})();