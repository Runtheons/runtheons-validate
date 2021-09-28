const DateValue = require('./DateValue').constructor;

module.exports = class DateTimeValue extends DateValue {
	constructor() {
		super();
		this.format = 'YYYY-MM-DD HH:mm:ss';
	}
};
