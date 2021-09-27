const DateValue = require('./DateValue').constructor;

module.exports = new(class TimeValue extends DateValue {
	constructor() {
		super();
		this.format = 'HH:mm:ss';
	}
})();