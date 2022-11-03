const StringValue = require('./StringValue');
const moment = require('moment');

module.exports = class DateValue extends StringValue {
	constructor() {
		super();
		this.avaibleAttributes = ['type', 'min', 'max', 'minAge', 'maxAge'];
		this.format = 'YYYY-MM-DD';
	}

	validate(key, schema, value) {
		if (schema.format != undefined)
			this.format = schema.format;
		return super.validate(key, schema, value);
	}

	type(key, requiredValue, dataValue) {
		if (!moment(dataValue, this.format, true).isValid()) {
			return [key + ' is not a date in format ' + this.format];
		}
		return [];
	}

	min(key, requiredValue, dataValue) {
		//Convert the value and the requiredValue as date with moment.js
		var valueAsDate = moment(dataValue, this.format, true);
		var minAsDate = moment(requiredValue, this.format, true);
		if (!minAsDate.isValid()) {
			return ['The min setted in ' + key + " isn't in format " + this.format];
		} else {
			//Find the min value beetwen the two date
			var min = moment.min(valueAsDate, minAsDate);
			//if the min value is the dataValue then the value is lower of the required value
			if (min == valueAsDate) {
				return [key + ' is lower than ' + requiredValue];
			} else {
				return [];
			}
		}
	}

	max(key, requiredValue, dataValue) {
		//Convert the value and the requiredValue as date with moment.js
		var valueAsDate = moment(dataValue, this.format, true);
		var maxAsDate = moment(requiredValue, this.format, true);
		if (!maxAsDate.isValid()) {
			return ['The max setted in ' + key + " isn't in format " + this.format];
		} else {
			//Find the min value beetwen the two date
			var max = moment.max(valueAsDate, maxAsDate);
			//if the max value is the dataValue then the value is greater of the required value
			if (max == valueAsDate) {
				return [key + ' is greater than ' + requiredValue];
			} else {
				return [];
			}
		}
	}

	minAge(key, requiredValue, dataValue) {
		//Convert the value as date with moment.js
		var valueAsDate = moment(dataValue, this.format, true);
		//Create a new date from now, with required value as age
		var ageAsDate = moment().subtract(requiredValue);
		//Find the min value beetwen the two date
		var min = moment.min(valueAsDate, ageAsDate);
		//if the min value isn't the dataValue then the dataValue is grater than the age date
		if (min != valueAsDate) {
			return [key + ' must be greater'];
		}
		return [];
	}

	maxAge(key, requiredValue, dataValue) {
		//Convert the value as date with moment.js
		var valueAsDate = moment(dataValue, this.format, true);
		//Create a new date from now, with required value as age
		var ageAsDate = moment().subtract(requiredValue);
		//Find the max value beetwen the two date
		var max = moment.max(valueAsDate, ageAsDate);
		//if the max value isn't the dataValue then the dataValue is lower than the age date
		if (max != valueAsDate) {
			return [key + ' must be lower'];
		}
		return [];
	}
};