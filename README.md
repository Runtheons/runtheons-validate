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
This repository contains the source code and official documentation of the endpoints validator system. If the aforementioned documentation is not clear or contains errors, please report it immediately to the email address **bugs-documentation@runtheons.com** or report the issue here on GitHub. Please be extremely clear and precise in the description of the issue so that moderators can correct it as soon as possible.

# Getting started


## Prerequisites

1. Git
2. Node: any 14.x version starting with v14.5.0 or greater

## Installation

1. `npm install https://github.com/iamousseni/runtheons-validate` to add the package to the project

# Use

It is necessary to define an object schema that defines the input you want to receive, for each element of the object it is necessary to define its type:

The types of inputs are:
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

Each type of input is defined in `validate/data.js` as a class that extends from the superclass data, to add a new data type it is necessary to add a new export in data.js.
This new type already has some attributes (eg Max, min, required), you can/should overwrite the function otherwise it will always return true.

# Example of use

When defining an array or object you have to define the attributes as an object

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
When the system receives a request, the validator starts working.
We have a recursive _val function in the main file which analyzes the input received for each element of the schema, which is recursive for object and array inputs.

When the validator understands the type of input, it calls the validator method of this data type and checks whether the data passed respects the scheme.


# Summary System structure

- root
    - index.js > Export of the validator
    - validate/data.js > Data type of the validator
    - validate/Runtheons_validate.js > Main program of the validator
