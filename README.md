# Runtheons Validate

npm package to validate endpoints

# Index

- [Introduction](https://github.com/iamousseni/runtheons-validate#introduction)
- [Getting started](https://github.com/iamousseni/runtheons-validate#getting-started)
  - [Prerequisites](https://github.com/iamousseni/runtheons-validate#prerequisites)
  - [Installation](https://github.com/iamousseni/runtheons-validate#installation)
- [Example of use](https://github.com/iamousseni/runtheons-validate#example-of-use)
- [Type](https://github.com/iamousseni/runtheons-validate#type)
- [System structure](https://github.com/iamousseni/runtheons-validate#system-structure)

# Introduction

This repository contains the source code and official documentation of the endpoints validator system. If the aforementioned documentation is not clear or contains errors, please report it immediately to the email address **bugs-documentation@runtheons.com** or report the issue here on GitHub. Please be extremely clear and precise in the description of the issue so that moderators can correct it as soon as possible.

# Getting started

## Prerequisites

1. Git
2. Node: any 14.x version starting with v14.5.0 or greater

## Installation

1. `npm install https://github.com/iamousseni/runtheons-validate#3.3.0` to add the package to the project

# Example of use

When defining an array or object you have to define the attributes as an object

```javascript
var validator = require('@runtheons/validate');

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
	arr: {
		type: 'array',
		of: {
			type: 'int',
			max: 10
		}
	},
	obj: {
		type: 'object',
		required: true,
		of: {
			id: {
				type: 'int'
			},
			description: {
				type: 'string'
			}
		}
	}
};

let objData = {
	id: 8,
	description: '22',
	arr: [1, 3, 15],
	obj: {
		id: 1,
		description: 'My description'
	}
};

console.log(validator.validate(objSchema, objData));
/*{
	status: false,
	errors: [
		arr.2 is greater than 10
	]
}*/

objData = {
	id: 8,
	description: '22',
	arr: [1, 3],
	obj: {
		id: 1,
		description: 'My description'
	}
};

console.log(validator.validate(objSchema, objData));
/*{
	status: true,
	errors: []
}*/
```

# Type

The types of inputs are:

- [INTEGER](https://github.com/iamousseni/runtheons-validate/blob/master/doc/integer.md)
- [FLOAT](https://github.com/iamousseni/runtheons-validate/blob/master/doc/float.md)
- [BOOLEAN](https://github.com/iamousseni/runtheons-validate/blob/master/doc/boolean.md)
- [STRING](https://github.com/iamousseni/runtheons-validate/blob/master/doc/string.md)
- [EMAIL](https://github.com/iamousseni/runtheons-validate/blob/master/doc/email.md)
- [LINK](https://github.com/iamousseni/runtheons-validate/blob/master/doc/link.md)
- [UUIDV4](https://github.com/iamousseni/runtheons-validate/blob/master/doc/uuidv4.md)
- [DATE](https://github.com/iamousseni/runtheons-validate/blob/master/doc/date.md)
- [DATETIME](https://github.com/iamousseni/runtheons-validate/blob/master/doc/datetime.md)
- [TIME](https://github.com/iamousseni/runtheons-validate/blob/master/doc/time.md)
- [OBJECT](https://github.com/iamousseni/runtheons-validate/#object)
- [ARRAY](https://github.com/iamousseni/runtheons-validate/#file)
- [ARRAY_OF_INTEGER](https://github.com/iamousseni/runtheons-validate/#file)
- [ENUM](https://github.com/iamousseni/runtheons-validate/#enum)
- [FILE](https://github.com/iamousseni/runtheons-validate/#file)

### OBJECT

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| required  | bool   | Set if this field is required (default : true) |
| of        | object | Set the field of the object (Is required)      |

```javascript
var objSchema = {
	position: {
		type: Validator.OBJECT,
		required: true,
		of: {
			latitude: {
				type: Validator.FLOAT,
				required: true
			},
			longitude: {
				type: Validator.FLOAT,
				required: true
			}
		}
	}
};
```

### ARRAY

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| required  | bool   | Set if this field is required (default : true) |
| of        | object | Set the type of the array item (Is required)   |

```javascript
var objSchema = {
	receivers: {
		type: Validator.ARRAY,
		required: true,
		of: {
			type: Validator.EMAIL
		}
	}
};
```

### ARRAY_OF_INTEGER

It's a shortcut

```javascript
var objSchema = {
	marks: {
		type: Validator.ARRAY_OF_INTEGER,
		required: true
	}
};
var objSchema2 = {
	marks: {
		type: Validator.ARRAY,
		required: true,
		of: {
			type: Validator.INTEGER
		}
	}
};
// Those two schema have same effect
```

### ENUM

| Parameter | Type  | Description                                    |
| --------- | ----- | ---------------------------------------------- |
| required  | bool  | Set if this field is required (default : true) |
| values    | array | Set the available values                       |

```javascript
var objSchema = {
	sex: {
		type: Validator.ENUM,
		required: true,
		values: ['M', 'F']
	}
};
```

### FILE

| Attributes | Type               | Description                                    |
| ---------- | ------------------ | ---------------------------------------------- |
| required   | bool               | Set if this field is required (default : true) |
| mimetype   | string or string[] | A mimetype or a array of mimetype allowed      |

```javascript
var objSchema = {
	photo: {
		type: Validator.FILE, //The photo must be a file
		mimetype: [
			'image/png', //The photo must be a .png, .jpg or .gif
			'image/jpg',
			'image/gif'
		],
		required: true //The photo is required
	}
};
```

# System structure

When the system receives a request, the validator starts working.
We have a recursive \_val function in the main file which analyzes the input received for each element of the schema, which is recursive for object and array inputs.

When the validator understands the type of input, it calls the validator method of this data type and checks whether the data passed respects the scheme.
