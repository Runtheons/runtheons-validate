const AbstractValue = require("./AbstractValue");

module.exports = new class FileValue extends AbstractValue {

	constructor() {
		super();
		this.avaibleAttributes = ["type", "mimetype"];
	}

	type(key, requiredValue, dataValue) {
		if (
			dataValue.name == undefined ||
			dataValue.data == undefined ||
			dataValue.size == undefined ||
			dataValue.size <= 0 ||
			dataValue.mimetype == undefined
		) {
			return [key + " is not a file"];
		}
		return [];
	}

	mimetype(key, requiredValue, dataValue) {

		if (!Array.isArray(requiredValue)) {
			requiredValue = [requiredValue];
		}
		var recivedMimeType = dataValue.mimetype;

		var correct = false;
		requiredValue.forEach(mimeType => {
			var reg = new RegExp(mimeType);
			if (reg.exec(recivedMimeType) != null) {
				correct = true;
			}
		})
		if (!correct) {
			return [key + "'s mimetype isn't in the avaible list"];
		}
		return [];
	}
}