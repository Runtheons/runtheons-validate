module.exports = class Validator {

	validate(schema, data) {
		var errors = [];

		Object.keys(schema).forEach(key => {
			var dataValue = (data[key] != undefined ? data[key] : undefined);
			var err = this._val(key, schema[key], dataValue);
			errors = errors.concat(err);
		});

		return {
			status: (errors.length == 0 ? true : false),
			errors: errors
		};
	}

	_val(key, schema, data) {
		if (schema['type'] == undefined) {
			return [key + " haven't 'type' parameter"];
		}
		switch (schema['type']) {
			case 'object':
				if (schema.of == undefined || schema.of == null) {
					return [key + "haven't the 'of' parameter"];
				}

				var errors = [];
				Object.keys(schema.of).forEach(subkey => {
					var recursiveKey = key + "." + subkey;
					var dataValue = (data[subkey] != undefined ? data[subkey] : undefined);
					var err = this._val(recursiveKey, schema.of[subkey], dataValue);
					errors = errors.concat(err);
				});
				return errors;
			case 'array':
				if (!Array.isArray(data)) {
					return [key + " is not an Array"];
				}
				if (schema.of == undefined || schema.of == null) {
					return [key + "haven't the 'of' parameter"];
				}

				var errors = [];
				for (let i = 0; i < data.length; i++) {
					var recursiveKey = key + "." + i;
					var dataValue = (data[i] != undefined ? data[i] : undefined);
					var err = this._val(recursiveKey, schema.of, dataValue);
					errors = errors.concat(err);
				};
				return errors;
			case 'int':
				return require("./validate/numberData").int.validate(key, schema, data);
				/*
							case 'double':
								return require("./validate/numberData").double.validate(key, schema, data);
							case 'float':
								return require("./validate/numberData").float.validate(key, schema, data);
							case 'string':
								return require("./validate/stringData").string.validate(key, schema, data);
							case 'email':
								return require("./validate/stringData").email.validate(key, schema, data);
							case 'link':
								return require("./validate/stringData").link.validate(key, schema, data);
							case 'date':
								return require("./validate/dateData").date.validate(key, schema, data);
							case 'datetime':
								return require("./validate/dateData").datetime.validate(key, schema, data);
							case 'time':
								return require("./validate/dateData").time.validate(key, schema, data);
							case 'file':
								return require("./validate/fileData").file.validate(key, schema, data);*/
		}
	}
};