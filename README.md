# Runtheons Validate

npm package to validate endpoints

# Index

- [Introduction](https://github.com/Runtheons/runtheons-validate#introduction)
- [Getting started](https://github.com/Runtheons/runtheons-validate#getting-started)
  - [Prerequisites](https://github.com/Runtheons/runtheons-validate#prerequisites)
  - [Installation](https://github.com/Runtheons/runtheons-validate#installation)
- [Example of use](https://github.com/Runtheons/runtheons-validate#example-of-use)
- [Type](https://github.com/Runtheons/runtheons-validate#type)
- [System structure](https://github.com/Runtheons/runtheons-validate#system-structure)

# Introduction

This repository contains the source code and official documentation of the endpoints validator system. If the aforementioned documentation is not clear or contains errors, please report it immediately to the email address **bugs-documentation@runtheons.com** or report the issue here on GitHub. Please be extremely clear and precise in the description of the issue so that moderators can correct it as soon as possible.

# Getting started

## Prerequisites

1. Git
2. Node: any 14.x version starting with v14.5.0 or greater

## Installation

1. `npm install https://github.com/Runtheons/runtheons-validate#v3.5.4` to add the package to the project

# Example of use

When defining an array or object you have to define the attributes as an object

```javascript
const Validator = require('@runtheons/validate');

let objSchema = {
	id: {
		type: Validator.INTEGER,
		required: Validator.REQUIRED,
		min: 1
	},
	description: {
		type: Validator.STRING,
		required: Validator.REQUIRED
	},
	arr: {
		type: Validator.ARRAY,
		of: {
			type: Validator.INTEGER,
			max: 10
		}
	},
	obj: {
		type: Validator.OBJECT,
		required: Validator.REQUIRED,
		of: {
			id: {
				type: Validator.INTEGER
			},
			description: {
				type: Validator.STRING
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

- [INTEGER](https://github.com/Runtheons/runtheons-validate/blob/master/doc/integer.md)
- [FLOAT](https://github.com/Runtheons/runtheons-validate/blob/master/doc/float.md)
- [BOOLEAN](https://github.com/Runtheons/runtheons-validate/blob/master/doc/boolean.md)
- [STRING](https://github.com/Runtheons/runtheons-validate/blob/master/doc/string.md)
- [EMAIL](https://github.com/Runtheons/runtheons-validate/blob/master/doc/email.md)
- [LINK](https://github.com/Runtheons/runtheons-validate/blob/master/doc/link.md)
- [UUIDV4](https://github.com/Runtheons/runtheons-validate/blob/master/doc/uuidv4.md)
- [DATE](https://github.com/Runtheons/runtheons-validate/blob/master/doc/date.md)
- [DATETIME](https://github.com/Runtheons/runtheons-validate/blob/master/doc/datetime.md)
- [TIME](https://github.com/Runtheons/runtheons-validate/blob/master/doc/time.md)
- [OBJECT](https://github.com/Runtheons/runtheons-validate/#object)
- [ARRAY](https://github.com/Runtheons/runtheons-validate/#file)
- [ARRAY_OF_INTEGER](https://github.com/Runtheons/runtheons-validate/#file)
- [ENUM](https://github.com/Runtheons/runtheons-validate/#enum)
- [FILE](https://github.com/Runtheons/runtheons-validate/#file)

### OBJECT

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| required  | bool   | Set if this field is required (default : true) |
| of        | object | Set the field of the object (Is required)      |

```javascript
let objSchema = {
	position: {
		type: Validator.OBJECT,
		required: Validator.REQUIRED,
		of: {
			latitude: {
				type: Validator.FLOAT,
				required: Validator.REQUIRED
			},
			longitude: {
				type: Validator.FLOAT,
				required: Validator.REQUIRED
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
let objSchema = {
	receivers: {
		type: Validator.ARRAY,
		required: Validator.REQUIRED,
		of: {
			type: Validator.EMAIL
		}
	}
};
```

### ARRAY_OF_INTEGER

It's a shortcut

```javascript
let objSchema = {
	marks: {
		type: Validator.ARRAY_OF_INTEGER,
		required: Validator.REQUIRED
	}
};
let objSchema2 = {
	marks: {
		type: Validator.ARRAY,
		required: Validator.REQUIRED,
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
let objSchema = {
	sex: {
		type: Validator.ENUM,
		required: Validator.REQUIRED,
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
let objSchema = {
	photo: {
		type: Validator.FILE, //The photo must be a file
		mimetype: [
			'image/png', //The photo must be a .png, .jpg or .gif
			'image/jpg',
			'image/gif'
		],
		required: Validator.REQUIRED //The photo is required
	}
};
```

# System structure

When the system receives a request, the validator starts working.
We have a recursive \_val function in the main file which analyzes the input received for each element of the schema, which is recursive for object and array inputs.

When the validator understands the type of input, it calls the validator method of this data type and checks whether the data passed respects the scheme.
