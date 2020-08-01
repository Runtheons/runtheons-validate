# runtheons-validate
npm package to validate endpoints


# Index

- [Introduction](https://github.com/iamousseni/runtheons-validate#introduction "Introduction")
- [Getting started](https://github.com/iamousseni/runtheons-validate#getting-started "Getting started")
    - [Prerequisites](https://github.com/iamousseni/runtheons-validate#prerequisites "Prerequisites")
    - [Installation](https://github.com/iamousseni/runtheons-validate#installation "Installation")
- [Use](https://github.com/iamousseni/runtheons-validate#use "Use")
- [Example of use](https://github.com/iamousseni/runtheons-validate#example-of-use "Example of use")
- [System structure](https://github.com/iamousseni/runtheons-validate#system-structure "System structure")
- [Summary System structure](https://github.com/iamousseni/runtheons-validate#summary-system-structure "Summary System structure")

# Introduction
This is our validator

# Getting started


## Prerequisites

1. Git
2. Node: any 14.x version starting with v14.5.0 or greater

## Installation

1. `npm install https://github.com/iamousseni/runtheons-validate` to add the package to the project

# Use

You must define a object schema that define the input you want recived, for each element of the object you must define the type:

The input type are:
- int
- float
- double
- string
- date
- datetime
- object
- array

Here an example
```javascript
var objSchema = {
    id: {
        type: 'int',
        required: true
    },
    description: {
        type: 'string',
        required: false
    }
}
```

Each input type is defined in `validate/data.js` as a class that extends from super class data, for add new data type you must add a new export in data.js.
This new type already have some attribute (es. max, min, required), you can override the function else it will return always true.

# Example of use

When you defined an array or a object you must define the attribute of as a object

```javascript
var validator = require("runtheons-validate");

let objSchema = {
    id: {
        type: 'int',
        required: true,
        min: 1
    },
    description: {
        type: 'string',
		required: true
    },
	arr:{
		type:'array',
		of: {
			type:"int",
			max:10
		}
	},
	obj:{
		type:'object',
		required: true,
		of: {
			id : {
				type:"int"
			},
			description: {
				type: 'string'
			}
		}
	}
}

let objData = {
    id: 8,
    description: "22",
	arr: [
		1,
		3,
		15
	],
	obj: {
		id: 1,
		description: "My description"
	}
}

console.log(validator.validate(objSchema, objData));

Result:
{
	result: false,
	errors: [
		arr.2 is greater than 10
	]
}


let objData = {
    id: 8,
    description: "22",
	arr: [
		1,
		3
	],
	obj: {
		id: 1,
		description: "My description"
	}
}

console.log(validator.validate(objSchema, objData));

Result:
{
	result: true,
	errors: []
}
```

# System structure
When the system riceved a requestthe validator start to work, we have a recursive function _val in main file that for each element of the schema analized the recived input, it is recursive for object and array

When the validator understand the input type, call the validato method of this data type, it check if the input is valid and for all attribute type (required, max, min) chek if they're valid


# Summary System structure

- root
    - index.js > Export of the validator
    - validate/data.js > Data type of the validator
    - validate/Runtheons_validate.js > Main program of the validator