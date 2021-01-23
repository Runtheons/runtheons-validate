const StringValue = require("./StringValue").constructor;

module.exports = new class EmailValue extends StringValue {

	constructor() {
		super();
		this.avaibleAttributes = ["type"];
	}

	type(key, requiredValue, dataValue) {
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!reg.test(dataValue)) {
			return [key + " is not an email"];
		}
		return [];
	}

}