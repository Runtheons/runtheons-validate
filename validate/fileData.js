const superData = require("./superData");

class fileData extends superData{
	
	constructor(){
		super();
		this.attr = ["required"];	
	}
	
	validate(property, schema, value, errors){
		super.validate(property, schema, value, errors);
		if(
			value.name == undefined ||
			value.data == undefined ||
			value.size == undefined ||
			value.size <= 0 ||
			value.mimetype == undefined
		){
			errors.push(property+" is not a file");
		}
	}
}

exports.file = fileData
