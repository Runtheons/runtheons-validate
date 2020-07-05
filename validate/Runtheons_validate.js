/**
 *  @author Ousseni Bara
 *  @github iamousseni
 *  @version 1.0.0.0
 */


module.exports = class RuntheonsValidate {
	isString(data) {
		return typeof data === 'string';
	}

	isInt(data) {
		return Number.isInteger(data);
	}

	getType(data) {
		let type = null;
		switch (typeof data) {
			case 'string':
				type = typeof data;
				break;
			case 'number':
				if (Number.isInteger(data))
					type = 'integer';
				else if (Number(data) === data && data % 1 !== 0)
					type = 'float';
				break;
		}

		return type;
	}

	checkType(data, type) {
		switch (type) {
			case 'string':
				return typeof data === type;
			case 'integer':
				return Number.isInteger(data);
			default:
				return false;
		}
	}

	checkSize(data, size) {
		switch (typeof data) {
			case 'string':
				return data.length <= size;
			case 'number':
				return data <= size;
			default:
				return false;
		}
	}

	checkRequired(data, required) {
		if (required)
			return data.length >= 0 || data !== null;
	}

	checkMin(data, min) {
		return data >= min;
	}

	checkMax(data, min) {
		return data <= min;
	}

	isEmptyObj(obj) {
		return Object.keys(obj).length === 0;
	}

	validate(objSchema, objData) {
		var errors = {};
		for (const property in objSchema) {
			let data = objData[property];
			let propertyCheck = property;
			let schema = objSchema[property];
			for (const property in schema) {
				switch (property) {
					case 'type':
						if (!this.checkType(data, schema[property]))
							errors.type = `Error on property passed: ` + propertyCheck + " \r\n" + `The schema declared doesn't match with the data passed. ` +
								" \r\n Schema Type: " + schema[property] + " \r\n Data Type: " + this.getType(data);
						break;
					case 'size':
						if (!this.checkSize(data, schema[property]))
							errors['size'] = `Error on property passed: ` + propertyCheck + " \r\n" + `The schema declared doesn't match with the data passed. ` +
								" \r\n Schema size: " + schema[property] + " \r\n Data size: " + this.getType(data);
						break;
					case 'required':
						if (schema[property] && !this.checkRequired(data, schema[property]))
							errors['required'] = `Error on property passed: ` + propertyCheck + " \r\n" + `The schema declared doesn't match with the data passed. ` +
								" \r\n Schema required: " + schema[property] + " \r\n Data passed is null or empty ";
						break;
					case 'min':
						if (schema[property] && !this.checkMin(data, schema[property]))
							errors['required'] = `Error on property passed: ` + propertyCheck + " \r\n" + `The schema declared doesn't match with the data passed. ` +
								" \r\n Schema min value: " + schema[property] + " \r\n Data passed: " + data;
						break;
					case 'max':
						if (schema[property] && !this.checkMax(data, schema[property]))
							errors['required'] = `Error on property passed: ` + propertyCheck + " \r\n" + `The schema declared doesn't match with the data passed. ` +
								" \r\n Schema max value: " + schema[property] + " \r\n Data passed: " + data;
						break;


				}
			}
		}

		return this.isEmptyObj(errors) ? { result: true, errors: errors } : { result: false, errors: errors };
	}
};

