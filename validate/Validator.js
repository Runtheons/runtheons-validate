const data = require('./data.js');

module.exports = class Validator {

	validate(schema, data) {
		var errors = [];

		Object.keys(schema).forEach(key => {
			var err = this._val(key, schema[key], data[key]);
			errors = Array.concat(errors, err);
		});

		return {
			status: (errors.length == 0 ? true : false),
			errors: errors
		};
	}

	_val(key, schema, data) {
		if (schema['type'] == undefined) {
			errors.push(key + " haven't 'type' parameter");
		}
		switch (schema['type']) {
			case 'object':
				if (schema['required'] == undefined || schema['required'] == true) {
					if (data == undefined) {
						errors.push(key + " is required");
					} else {
						//controlo se c'è il parametro obbligatorio of
						if (schema.of == undefined) {
							errors.push(key + " haven't 'of' parameter");
						} else {
							//Alcuni controlli
							var s = Object.entries(data);

							for (let i = 0; i < s.length; i++) {
								this._val(key + "." + s[i][0], schema.of[s[i][0]], s[i][1]);
							}
						}
					}
				}
				break;
			case 'array':
				if (schema['required'] == undefined || schema['required'] == true) {
					if (data == undefined) {
						errors.push(key + " is required");
					} else {
						//controllo se davvero è un array
						if (!Array.isArray(data)) {
							errors.push(key + " is not an Array");
						} else {
							//se davvero è un array controlo se c'è il parametro obbligatorio of
							if (schema.of == undefined) {
								errors.push(key + " haven't 'of' parameter");
							} else {
								//Controllo che tutti gli elementi siano dello stesso schema indicato in schema.of
								for (let i = 0; i < data.length; i++) {
									this._val(key + "." + i, schema.of, data[i]);
								}
							}
						}
					}
				}
				break;

			default:
				if (data[schema['type']] != undefined) {
					data[schema['type']].validate(key, schema, data);
				} else {
					errors.push(key + " type is unknown");
				}
				break;
		}
	}
};