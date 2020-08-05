//Definizione di un generale valore

module.exports = class superData{
	validate(property, schema, value, errors){
		for (const pp in schema) {
			switch(pp){
				case 'min':
					this.min(property, schema, value, errors);
					break
				case 'max':
					this.max(property, schema, value, errors);
					break
				case 'required':
					this.required(property, schema, value, errors);
					break
				default:
					break;
			}
		}
	}
	
	min(property, schema, value, errors){
		if(value < schema['min']){
			errors.push(property+" is lower than "+schema['min']);
		}
	}
	
	max(property, schema, value, errors){
		if(value > schema['max']){
			errors.push(property+" is greater than "+schema['max']);
		}
	}
	
	required(property, schema, value, errors){
		if(value == undefined || value == null || value == ""){
			errors.push(property+" is required");
		}
	}
	
}