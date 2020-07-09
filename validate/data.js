/**
 *  @author Zexal0807
 *  @github iamousseni
 *  @version 1.0.0.0
 */

//Definizione di un generale valore
class superData{
	function validate(schema, value){
		let ret = true;
		for (const property in schema) {
			switch(property){
				case 'min':
					ret = this.min(schema, value);
					break
				case 'max':
					ret = this.min(schema, value);
					break
				case 'required':
					ret = this.required(schema, value);
					break
				default:
					break;
			}
			if(!ret)
				return false;
		}
		return true;
	}
	function min(schema, value){ return true }	//per alcuni tipi può non esistere min e max(bool)
	function max(schema, value){ return true }
	abstract function required(schema, value);
}
class numberData extends superData{
	function validate(schema, value){
		if(typeof value = "number")
			return false;
		else
			super.validate(schema, value);
	}	
	function min(schema, value){
		if(value >= schema['min'])
			return false;
	}
	function max(schema, value){
		if(value <= schema['max'])
			return false;
	}
	function required(schema, value){
		if(value == undefined || value == null || value == "")
			return false;
	}
}
class stringData extends superData{
	function required(schema, value){
		if(value == undefined || value == null || value == "")
			return false;
	}
}

exports.data = {
	int : class intData extends numberData{
		//Per gli int controllo che non abbia parte decimale dividendo per 1
		function validate(schema, value){
			if(value%1 != 0)
				return false;
			else
			super.validate(schema, value);
		}
	},
	float: class floatData extends numberData{},
	double: class doubleData extends numberData{},
	string : stringData,
	date : class dateData extends stringData{
		function min(schema, value){
			if(value >= schema['min'])
				return false;
		}
		function max(schema, value){
			if(value <= schema['max'])
				return false;
		}
	},
	datetime : class datetimeData extends stringData{
		function min(schema, value){
			if(value >= schema['min'])
				return false;
		}
		function max(schema, value){
			if(value <= schema['max'])
				return false;
		}
	}
};
