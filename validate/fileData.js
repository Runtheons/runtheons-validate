const superData = require("./superData");

class fileData extends superData{
	max(property, schema, value, errors){}
	min(property, schema, value, errors){}
	validate(property, schema, value, errors){
		super.validate(property, schema, value, errors);
		console.log(value);
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
