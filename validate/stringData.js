const superData = require("./superData");

//String data (string, date, datetime, ip, mac, email.....)
class stringData extends superData{
	
	constructor(){
		super();
		this.attr = ["min", "max", "required", "reg"];
	}
	
	validate(property, schema, value, errors){
		if(typeof value != "string"){
			errors.push(property+" is not a string");
		}else{
			super.validate(property, schema, value, errors);
		}
	}
	
	reg(property, schema, value, errors){
		var reg = new RegExp(schema['reg']);
		if(!reg.exec(value)){
			errors.push(property+" don't match the reg "+reg);
		}
	}
}

exports.string = stringData

exports.email = class emailData extends stringData{
	validate(property, schema, value, errors){
		super.validate(property, schema, value, errors);
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!reg.test(value)){
			errors.push(property+" is not a email");
		}
	}
}