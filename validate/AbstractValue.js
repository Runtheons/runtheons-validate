module.exports = class AbstractValue {

	constructor() {
		this.avaibleAttributes = ["min", "max"];
	}

	validate(key, schema, value) {
		var errors = [];

		var optional = (schema.required != undefined ? schema.required : false);


		if (value == undefined) {
			if (optional) {
				return [];
			} else {
				return [key + " is required"];
			}
		}

		Object.keys(schema).forEach(attributes => {
			if (this.avaibleAttributes.includes(attributes)) {
				var err = this[attributes](key, schema[attributes], value);
				errors.concat(err);
			}
		});
		return errors;
	}

	min(key, requiredValue, dataValue) {
		if (dataValue < requiredValue) {
			return key + " is lower than " + requiredValue;
		}
		return "";
	}

	max(key, requiredValue, dataValue) {
		if (dataValue > requiredValue) {
			return key + " is greater than " + requiredValue;
		}
		return "";
	}

}