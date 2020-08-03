/**
 *  @author Zexal0807
 *  @github iamousseni
 *  @version 1.2.0.0
 */

//Definizione di un generale valore
class superData{
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
//Numeric data (int, double, float..)
class numberData extends superData{
	validate(property, schema, value, errors){
		if(typeof value != "number"){
			errors.push(property+" is not a number");
		}else{
			super.validate(property, schema, value, errors);
		}
	}
}

//String data (string, date, datetime, ip, mac, email.....)
class stringData extends superData{
	validate(property, schema, value, errors){
		if(typeof value != "string"){
			errors.push(property+" is not a string");
		}else{
			super.validate(property, schema, value, errors);
		}
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
	date : new class dateData extends stringData{
		//from format
	},
	datetime : new class datetimeData extends stringData{
		//from format
	},
	email : new class emailData extends stringData{
		validate(property, schema, value, errors){
			super.validate(property, schema, value, errors);
			var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(!reg.test(value)){
				errors.push(property+" is not a email");
			}
		}
	},
	file : new class fileData extends superData{
		max(property, schema, value, errors){}
		min(property, schema, value, errors){}
		validate(property, schema, value, errors){
			super.validate(property, schema, value, errors);
	/*		
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}*/
			

			errors.push(property+" is not a file");
			
		}
	}
	//Here we can add new type
};
