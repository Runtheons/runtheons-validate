/**
 *  @author Zexal0807
 *  @github iamousseni
 *  @version 1.0.0.0
 */

//Definizione di un generale valore
class superData{
	function validate(property, schema, value, errors){
		let ret = true;
		for (const pp in schema) {
			switch(pp){
				case 'min':
					ret = this.min(property, schema, value, &errors);
					break
				case 'max':
					ret = this.min(property, schema, value, &errors);
					break
				case 'required':
					ret = this.required(property, schema, value, &errors);
					break
				default:
					break;
			}
			if(!ret)
				return false;
		}
		return true;
	}
	function max(property, schema, value, errors){
		if(value <= schema['max']{
			errors.push(property+" is not greater than "+schema['max']);
			return false;
		}
		return true;
	}
	function required(property, schema, value, errors){
		if(value == undefined || value == null || value == ""){
			errors.push(property+" is required");
			return false;
		}
		return true;
	}
	abstract function required(property, schema, value, errors);
}
//Numeric data (int, double, float..)
class numberData extends superData{
	function validate(property, schema, value, errors){
		if(typeof value = "number"){
			errors.push(property+" is not a number");
			return false;
		}else
			super.validate(property, schema, value, &errors);
	}
	function required(property, schema, value, errors){
		if(value == undefined || value == null || value == ""){
			errors.push(property+" is required");
			return false;
		}
		return true;
	}
}
//String data (string, date, datetime, ip, mac, email.....)
class stringData extends superData{
	function required(property, schema, value, errors){
			errors.push(property+" is required");
			return false;
		}
		return true;
	}
}

exports.data = {
	int : class intData extends numberData{
		//Per gli int controllo che non abbia parte decimale dividendo per 1
		function validate(property, schema, value, errors){
			if(value%1 != 0){
				errors.push(property+" is not int");
				return false;
			}else
			super.validate(property, schema, value, &errors);
		}
	},
	float : class floatData extends numberData{},
	double : class doubleData extends numberData{},
	string : stringData,
	date : class dateData extends stringData{},
	datetime : class datetimeData extends stringData{}
	//Here we can add new type
};
