const DateValue = require('./DateValue');

module.exports = class DateTimeValue extends DateValue {
	constructor() {
		super();
		this.format = 'YYYY-MM-DD HH:mm:ss';
	}
};
