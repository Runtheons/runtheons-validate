/**
 *  @author Ousseni Bara
 *  @author Zexal0807
 *  @github iamousseni
 *  @version 1.1.1.0
 */

import {data} from './data.js';

module.exports = class RuntheonsValidate {

	validate(objSchema, objData) {
		let errors = [];
		for (const property in objSchema) {
			_val(property, objSchema[property], objData[property], &errors);
		}
		return this.isEmptyObj(errors) ? { result: true, errors: errors } : { result: false, errors: errors };
	}
		
	_val(property, objSchema, objData, errors){
		if(objSchema['type'] == undefined){
			errors.push(property+" haven't 'type' parameter");
			return false;
		}	
		let error = {};
		switch(objSchema['type']){
			case 'array':
				//controllo se davvero è un array
				if(!Array.isArray(objData)){
					errors.push(property+" is not an Array");
					return false;
				}
				//se davvero è un array controlo se c'è il parametro obbligatorio of
				if(objSchema.of == undefined){
					errors.push(property+" haven't 'of' parameter");
					return false;
				}
				//Controllo che tutti gli elementi siano dello stesso schema indicato in objSchema.of
				for(let i = 0, i < objData.length; i++){
					if(!_val(i, objSchema.of, objData[i]), &errors)
						return false;
				}
				return true;
			case 'int':
				return data.int.validate(property, objSchema, objData, &errors);
			case 'float':
				return data.float.validate(property, objSchema, objData, &errors);
			case 'double':
				return data.double.validate(property, objSchema, objData, &errors);
			default:
				return false;
		}
	}
	
	isEmptyObj(obj) {
		return Object.keys(obj).length === 0;
	}
};

