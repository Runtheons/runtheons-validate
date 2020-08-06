const superData = require("./superData");

class fileData extends superData{
	
	constructor(){
		super();
		this.attr = ["required", "mimetype"];
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
	
	mimetype(property, schema, value, errors){
		var reg = new RegExp(schema['mimetype']);
		if(!reg.exec(value)){
			errors.push(property+"'s mimetype isn't "+reg);
		}
	}
}

exports.file = fileData
