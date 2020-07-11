/**
 *  @author Zexal0807
 *  @github iamousseni
 *  @version 1.0.0.0
 */

//Definizione di un generale valore
class superData{
	validate(property, schema, value, errors){
		let ret = true;
		for (const pp in schema) {
			switch(pp){
				case 'min':
					ret = this.min(property, schema, value, errors);
					break
				case 'max':
					ret = this.max(property, schema, value, errors);
					break
				case 'required':
					ret = this.required(property, schema, value, errors);
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
//Numeric data (int, double, float..)
class numberData extends superData{
	validate(property, schema, value, errors){
		if(typeof value != "number"){
			errors.push(property+" is not a number");
		}else
			super.validate(property, schema, value, errors);
	}
}

//String data (string, date, datetime, ip, mac, email.....)
class stringData extends superData{
	validate(property, schema, value, errors){
		if(typeof value != "string"){
			errors.push(property+" is not a string");
		}else
			super.validate(property, schema, value, errors);
	}
}

module.exports = {
	int : new class intData extends numberData{
		//Per gli int controllo che non abbia parte decimale dividendo per 1
		validate(property, schema, value, errors){
			if(value%1 != 0){
				errors.push(property+" is not int");
			}else
			super.validate(property, schema, value, errors);
		}
	},
	float : new class floatData extends numberData{},
	double : new class doubleData extends numberData{},
	string : new stringData,
	date : new class dateData extends stringData{},
	datetime : new class datetimeData extends stringData{}
	//Here we can add new type
};
