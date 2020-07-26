const Runtheons_validate = require('./validate/Runtheons_validate');
moudule.exports = new Runtheons_validate();

/*

let validator = new Runtheons_validate();
let objSchema = {
    id: {
        type: 'int',
        required: true,
        min: 1,
        max: 8,
    },
    description: {
        type: 'string',
        size: 100,
        required: false,
    },
	arr:{
		type:'array',
		of:{
			type:"int",
			max:10
		},
		required:true
	}
}

let objData = {
    id: 8,
    description: "22",
	arr:[1, 3, 15]
}

console.log(validator.validate(objSchema, objData));
/**
 * Return expected:
 * {
			result: false,
			errors: [
				id: {
					max: "The schema declared doesn't match with the data passed.  \r\n" +
						' Schema max value: 8 \r\n' +
						' Data passed: 9'
				},
				description: {
					type: "The schema declared doesn't match with the data passed.  \r\n" +
						' Schema Type: string \r\n' +
						' Data Type: integer'
				}
			]
	}
 */