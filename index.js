
const Runtheons_validate = require('./validate/Runtheons_validate');

let validator = new Runtheons_validate();
let objSchema = {
    id: {
        type: 'integer',
        required: true,
        min: 1,
        max: 8,
    },
    description: {
        type: 'string',
        size: 100,
        required: false,
    }
}

let objData = {
    id: 9,
    description: '',
}

console.log(validator.validate(objSchema, objData));
/**
 * Return expected:
 * {
  	result: false,
  	errors: {
    required: 'Error on property passed: id \r\n' +
      "The schema declared doesn't match with the data passed.  \r\n" +
      ' Schema max value: 8 \r\n' +
      ' Data passed: 9'
  	}
	}
 */