module.exports = class Validator {
	constructor() {
		this.BOOLEAN = 'boolean';
		this.INTEGER = 'int';
		this.FLOAT = 'float';
		this.STRING = 'string';
		this.EMAIL = 'email';
		this.UUIDV4 = 'uuidv4';
		this.LINK = 'link';
		this.DATE = 'date';
		this.DATETIME = 'datetime';
		this.TIME = 'time';
		this.FILE = 'file';

		this.ENUM = 'enum';
		this.OBJECT = 'object';
		this.ARRAY = 'array';
		this.ARRAY_OF_INTEGER = 'array_of_integer';

		this.PARSE_INTEGER = true;
		this.NOT_PARSE_INTEGER = true;

		this.REQUIRED = true;
		this.NOT_REQUIRED = false;
	}

	validate(schema, data) {
		let errors = [];

		Object.keys(schema).forEach((key) => {
			let dataValue = data[key] != undefined ? data[key] : undefined;
			let err = this._val(key, schema[key], dataValue);
			errors = errors.concat(err);
		});

		return {
			status: errors.length == 0 ? true : false,
			errors: errors
		};
	}

	_val(key, schema, data) {
		if (schema['type'] == undefined) {
			return [key + " haven't 'type' parameter"];
		}
		let required = schema.required != undefined ? schema.required : true;
		let errors = [];

		switch (schema['type']) {
			case this.OBJECT:
				if (schema.of == undefined || schema.of == null) {
					return [key + "haven't the 'of' parameter"];
				}
				if (data == undefined) {
					if (required) {
						return [key + ' is required'];
					} else {
						return [];
					}
				}
				Object.keys(schema.of).forEach((subkey) => {
					let recursiveKey = key + '.' + subkey;
					let dataValue = data[subkey] != undefined ? data[subkey] : undefined;
					let err = this._val(recursiveKey, schema.of[subkey], dataValue);
					errors = errors.concat(err);
				});
				return errors;
			case this.ARRAY_OF_INTEGER:
				let customSchema = {
					type: this.ARRAY,
					of: { type: this.INTEGER },
					required: schema.required,
					min: schema.min,
					max: schema.max
				};
				return this._val(key, customSchema, data);
			case this.ENUM:
				if (schema.values == undefined || schema.values == null) {
					return [key + "haven't the 'values' parameter"];
				}
				if (!Array.isArray(schema.values)) {
					return [key + " 'values' is not an Array"];
				}
				if (data == undefined) {
					if (required) {
						return [key + ' is required'];
					} else {
						return [];
					}
				}
				if (schema.values.includes(data)) {
					return [];
				} else {
					return [key + ' not contains one of available values'];
				}
			case this.ARRAY:
				if (data == undefined) {
					if (required) {
						return [key + ' is required'];
					} else {
						return [];
					}
				}

				if (!Array.isArray(data)) {
					return [key + ' is not an Array'];
				}
				if (schema.of == undefined || schema.of == null) {
					return [key + "haven't the 'of' parameter"];
				}

				for (let i = 0; i < data.length; i++) {
					let recursiveKey = key + '.' + i;
					let dataValue = data[i] != undefined ? data[i] : undefined;
					let err = this._val(recursiveKey, schema.of, dataValue);
					errors = errors.concat(err);
				}
				return errors;
			case this.INTEGER:
				const IntegerValue = require('./validate/IntegerValue');
				return (new IntegerValue()).validate(key, schema, data);
			case this.FLOAT:
				const FloatValue = require('./validate/FloatValue');
				return (new FloatValue()).validate(key, schema, data);
			case this.BOOLEAN:
				const BooleanValue = require('./validate/BooleanValue')
				return (new BooleanValue()).validate(key, schema, data);
			case this.STRING:
				const StringValue = require('./validate/StringValue');
				return (new StringValue()).validate(key, schema, data);
			case this.EMAIL:
				const EmailValue = require('./validate/EmailValue');
				return (new EmailValue()).validate(key, schema, data);
			case this.LINK:
				let LinkValue = require('./validate/LinkValue');
				return (new LinkValue()).validate(key, schema, data);
			case this.UUIDV4:
				const UUIDV4Value = require('./validate/UUID4Value');
				return (new UUIDV4Value()).validate(key, schema, data);
			case this.DATE:
				const DateValue = require('./validate/DateValue');
				return (new DateValue()).validate(key, schema, data);
			case this.DATETIME:
				const DateTimeValue = require('./validate/DateTimeValue');
				return (new DateTimeValue()).validate(key, schema, data);
			case this.TIME:
				const TimeValue = require('./validate/TimeValue');
				return (new TimeValue()).validate(key, schema, data);
			case this.FILE:
				const FileValue = require('./validate/FileValue');
				return (new FileValue()).validate(key, schema, data);
		}
	}
};