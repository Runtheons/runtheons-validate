const StringValue = require('./StringValue');

module.exports = class LinkValue extends StringValue {
	constructor() {
		super();
		this.avaibleAttributes = ['type'];
		//TODO: Add protocoll = HTTP/HTTPS
		//TODO: Add host = [www.google.it, www.facebook.it, google.it]
	}

	type(key, requiredValue, dataValue) {
		let reg =
			/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
		if (!reg.test(dataValue)) {
			return [key + ' is not a link'];
		}
		return [];
	}
};