const data = require('./data.js');

module.exports = class Validator {

	validate(objSchema, objData) {
		var errors = [];

		for (const property in objData) {
			this._val(property, objSchema[property], objData[property], errors);
		}
		return {
			status: (errors.length == 0 ? true : false),
			errors: errors
		};
	}

	_val(property, objSchema, objData, errors) {
		if (objSchema['type'] == undefined) {
			errors.push(property + " haven't 'type' parameter");
		}
		if (objSchema['required'] != true) {
			objSchema['required'] = false;
		}
		switch (objSchema['type']) {
			case 'object':
				if (objSchema['required'] == undefined || objSchema['required'] == true) {
					if (objData == undefined) {
						errors.push(property + " is required");
					} else {
						//controlo se c'è il parametro obbligatorio of
						if (objSchema.of == undefined) {
							errors.push(property + " haven't 'of' parameter");
						} else {
							//Alcuni controlli
							var s = Object.entries(objData);

							for (let i = 0; i < s.length; i++) {
								this._val(property + "." + s[i][0], objSchema.of[s[i][0]], s[i][1], errors);
							}
						}
					}
				}
				break;
			case 'array':
				if (objSchema['required'] == undefined || objSchema['required'] == true) {
					if (objData == undefined) {
						errors.push(property + " is required");
					} else {
						//controllo se davvero è un array
						if (!Array.isArray(objData)) {
							errors.push(property + " is not an Array");
						} else {
							//se davvero è un array controlo se c'è il parametro obbligatorio of
							if (objSchema.of == undefined) {
								errors.push(property + " haven't 'of' parameter");
							} else {
								//Controllo che tutti gli elementi siano dello stesso schema indicato in objSchema.of
								for (let i = 0; i < objData.length; i++) {
									this._val(property + "." + i, objSchema.of, objData[i], errors);
								}
							}
						}
					}
				}
				break;

			default:
				if (data[objSchema['type']] != undefined) {
					data[objSchema['type']].validate(property, objSchema, objData, errors);
				} else {
					errors.push(property + " type is unknown");
				}
				break;
		}
	}
};