const DateValue = require('./DateValue');

module.exports = class TimeValue extends DateValue {
	constructor() {
		super();
		this.format = 'HH:mm:ss';
	}
};
