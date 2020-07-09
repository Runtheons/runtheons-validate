/**
 *  @author Ousseni Bara
 *  @author Zexal0807
 *  @github iamousseni
 *  @version 1.1.0.0
 */

import {data} from './data.js';

module.exports = class RuntheonsValidate {

	validate(objSchema, objData) {
		let errors = [];
		for (const property in objSchema) {
			_val(objSchema[property], objData[property], &errors);
		}
		return this.isEmptyObj(errors) ? { result: true, errors: errors } : { result: false, errors: errors };
	}
		
	_val(objSchema, objData, errors){
		let error = {};
		
		switch(objSchema['type']){
			case 'array':
				//controllo se davvero è un array
				if(!Array.isArray(objData))
					return false;
				//se davvero è un array controlo se c'è il parametro obbligatorio of
				if(objSchema.of == undefined)
					return false;
				//Controllo che tutti gli elementi siano dello stesso schema indicato in objSchema.of
				for(let i = 0, i < objData.length; i++){
					if(!_val(objSchema.of, objData[i]))
						return false;
				}
				return true;
			case 'int':
				return data.int.validate(objSchema, objData);
			case 'float':
				return data.float.validate(objSchema, objData);
			case 'double':
				return data.double.validate(objSchema, objData);
			default:
				return false;
		}
		/*
		for (const property in objSchema) {
			switch (property) {
				case 'type':
					//type definition is required
					if (!this.checkType(data, objSchema[property]))
						error.type = `The schema declared doesn't match with the data passed. ` +
							" \r\n Schema Type: " + objSchema[property] + " \r\n Data Type: " + this.getType(data);
					break;
				case 'size':
					if (!this.checkSize(data, objSchema[property]))
						error.size = `The schema declared doesn't match with the data passed. ` +
							" \r\n Schema size: " + objSchema[property] + " \r\n Data size: " + this.getType(data);
					break;
				case 'required':
					if (objSchema[property] && !this.checkRequired(data, objSchema[property]))
						error.required = `The schema declared doesn't match with the data passed. ` +
							" \r\n Schema required: " + objSchema[property] + " \r\n Data passed is null or empty ";
					break;
				case 'min':
					if (objSchema[property] && !this.checkMin(data, objSchema[property]))
						error.min = `The schema declared doesn't match with the data passed. ` +
							" \r\n Schema min value: " + objSchema[property] + " \r\n Data passed: " + data;
					break;
				case 'max':
					if (objSchema[property] && !this.checkMax(data, objSchema[property]))
						error.max = `The schema declared doesn't match with the data passed. ` +
							" \r\n Schema max value: " + objSchema[property] + " \r\n Data passed: " + data;
					break;
			}
		}
*/
		//if there was errors than added to array of errors
		/*if(!this.isEmptyObj(error))
			errors[propertyCheck] = error;
		*/
	}
};

