const DateValue = require('./DateValue');

module.exports = class TimeValue extends DateValue {
	constructor() {
		super();
		this.avaibleAttributes = ['type', 'min', 'max'];
		this.format = 'HH:mm:ss';
	}
};