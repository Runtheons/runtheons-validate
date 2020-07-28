/**
 *  @author Ousseni Bara
 *  @author Zexal0807
 *  @github iamousseni
 *  @version 1.1.1.0
 */

const data = require('./data.js');
module.exports = class RuntheonsValidate {

	validate(objSchema, objData) {
		var errors = [];
		for (const property in objSchema) {
			this._val(property, objSchema[property], objData[property], errors);
		}
		return this.isEmptyObj(errors) ? { result: true, errors: errors } : { result: false, errors: errors };
	}
		
	_val(property, objSchema, objData, errors){
		if(objSchema['type'] == undefined){
			errors.push(property+" haven't 'type' parameter");
		}
		switch(objSchema['type']){
			case 'object':
				//Alcuni controlli
				var s = Object.entries(objData);

				for(let i = 0; i < s.length; i++){
					this._val(property+"."+s[i][0], objSchema.of[s[i][0]], s[i][1], errors);
				}

				break;
			case 'array':
				if(objSchema['required'] == undefined || objSchema['required'] == true){
					if(objData == undefined){
						errors.push(property+" is required");
					}
					//controllo se davvero è un array
					if(!Array.isArray(objData)){
						errors.push(property+" is not an Array");
					}
					//se davvero è un array controlo se c'è il parametro obbligatorio of
					if(objSchema.of == undefined){
						errors.push(property+" haven't 'of' parameter");
					}
					//Controllo che tutti gli elementi siano dello stesso schema indicato in objSchema.of
					for(let i = 0; i < objData.length; i++){
						this._val(property+"."+i, objSchema.of, objData[i], errors);
					}
				}
				break;
			case 'int':
				data.int.validate(property, objSchema, objData, errors);
				break;
			case 'float':
				data.float.validate(property, objSchema, objData, errors);
				break;
			case 'double':
				data.double.validate(property, objSchema, objData, errors);
				break;
			case 'string':
				data.string.validate(property, objSchema, objData, errors);
				break;
			default:
				errors.push(property+" type is unknown");
		}
	}
	
	isEmptyObj(obj) {
		return Object.keys(obj).length === 0;
	}
};

