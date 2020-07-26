# runtheons-validate
npm package to validate endpoints


# Overview

[![NPM version](https://badge.fury.io/js/runtheons-validate.png)](http://badge.fury.io/js/runtheons-validate)


# Installing

The usual simple:

    npm install --save https://github.com/iamousseni/runtheons-validate

# API

The API is very simple, the following example probably tells you all you need to know:

```javascript
var validator = require("runtheons-validate");

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
	arr: [
		1,
		3,
		15
	]
}

console.log(validator.validate(objSchema, objData));
```