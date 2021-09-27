const StringValue = require("./StringValue").constructor;

module.exports = new(class LinkValue extends StringValue {
	constructor() {
		super();
		this.avaibleAttributes = ["type"];
		//To add protocoll = HTTP/HTTPS, getHost = [www.google.it, www.facebook.it, google.it]
	}

	type(key, requiredValue, dataValue) {
		var reg =
			/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
		if (!reg.test(dataValue)) {
			return [key + " is not a link"];
		}
		return [];
	}
})();