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
	}

	validate(schema, data) {
		var errors = [];

		Object.keys(schema).forEach((key) => {
			var dataValue = data[key] != undefined ? data[key] : undefined;
			var err = this._val(key, schema[key], dataValue);
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
		switch (schema['type']) {
			case this.OBJECT:
				if (schema.of == undefined || schema.of == null) {
					return [key + "haven't the 'of' parameter"];
				}

				var required = schema.required != undefined ? schema.required : true;
				if (data == undefined) {
					if (required) {
						return [key + ' is required'];
					} else {
						return [];
					}
				}

				var errors = [];
				Object.keys(schema.of).forEach((subkey) => {
					var recursiveKey = key + '.' + subkey;
					var dataValue = data[subkey] != undefined ? data[subkey] : undefined;
					var err = this._val(recursiveKey, schema.of[subkey], dataValue);
					errors = errors.concat(err);
				});
				return errors;
			case this.ARRAY_OF_INTEGER:
				var customSchema = {
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
				var required = schema.required != undefined ? schema.required : true;
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
				if (!Array.isArray(data)) {
					return [key + ' is not an Array'];
				}
				if (schema.of == undefined || schema.of == null) {
					return [key + "haven't the 'of' parameter"];
				}

				var required = schema.required != undefined ? schema.required : true;

				var errors = [];
				for (let i = 0; i < data.length; i++) {
					var recursiveKey = key + '.' + i;
					var dataValue = data[i] != undefined ? data[i] : undefined;
					var err = this._val(recursiveKey, schema.of, dataValue);
					errors = errors.concat(err);
				}
				return errors;
			case this.INTEGER:
				var IntegerValue = require('./validate/IntegerValue');
				IntegerValue = new IntegerValue();
				return IntegerValue.validate(key, schema, data);
			case this.FLOAT:
				var FloatValue = require('./validate/FloatValue');
				FloatValue = new FloatValue();
				return FloatValue.validate(key, schema, data);
			case this.BOOLEAN:
				var BooleanValue = require('./validate/BooleanValue');
				BooleanValue = new BooleanValue();
				return BooleanValue.validate(key, schema, data);
			case this.STRING:
				var StringValue = require('./validate/StringValue');
				StringValue = new StringValue();
				return StringValue.validate(key, schema, data);
			case this.EMAIL:
				var EmailValue = require('./validate/EmailValue');
				EmailValue = new EmailValue();
				return EmailValue.validate(key, schema, data);
			case this.LINK:
				var LinkValue = require('./validate/LinkValue');
				LinkValue = new LinkValue();
				return LinkValue.validate(key, schema, data);
			case this.UUIDV4:
				var UUIDV4Value = require('./validate/UUID4Value');
				UUIDV4Value = new UUIDV4Value();
				return UUIDV4Value.validate(key, schema, data);
			case this.DATE:
				var DateValue = require('./validate/DateValue');
				DateValue = new DateValue();
				return DateValue.validate(key, schema, data);
			case this.DATETIME:
				var DateTimeValue = require('./validate/DateTimeValue');
				DateTimeValue = new DateTimeValue();
				return DateTimeValue.validate(key, schema, data);
			case this.TIME:
				var TimeValue = require('./validate/TimeValue');
				TimeValue = new TimeValue();
				return TimeValue.validate(key, schema, data);
			case this.FILE:
				var FileValue = require('./validate/FileValue');
				FileValue = new FileValue();
				return FileValue.validate(key, schema, data);
		}
	}
};