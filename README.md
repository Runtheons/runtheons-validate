# Runtheons Validate

npm package to validate endpoints

# Index

- [Introduction](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#introduction)
- [Getting started](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#getting-started)
  - [Prerequisites](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#prerequisites)
  - [Installation](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#installation)
- [Example of use](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#example-of-use)
- [Type](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#type)
- [System structure](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#system-structure)

# Introduction

This repository contains the source code and official documentation of the endpoints validator system. If the aforementioned documentation is not clear or contains errors, please report it immediately to the email address **bugs-documentation@runtheons.com** or report the issue here on GitHub. Please be extremely clear and precise in the description of the issue so that moderators can correct it as soon as possible.

# Getting started

## Prerequisites

1. Git
2. Node: any 14.x version starting with v14.5.0 or greater

## Installation

1. `npm install https://github.com/iamousseni/runtheons-validate` to add the package to the project

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

- [INTEGER](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/integer.md)
- [FLOAT](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/float.md)
- [BOOLEAN](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/boolean.md)
- [STRING](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/string.md)
- [EMAIL](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/email.md)
- [file](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/file.md)
- [DATE](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/date.md)
- [DATETIME](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/datetime.md)
- [time](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/time.md)
  - [Allowed data format key](https://github.com/iamousseni/runtheons-validate#Allowed-data-format-key)

### file

| Attributes | Type               | Description                                    |
| ---------- | ------------------ | ---------------------------------------------- |
| required   | bool               | Set if this field is required (default : true) |
| mimetype   | string or string[] | A mimetype or a array of mimetype allowed      |

```javascript
var objSchema = {
	photo: {
		type: 'file', //The photo must be a file
		mimetype: [
			'image/png', //The photo must be a .png, .jpg or .gif
			'image/jpg',
			'image/gif'
		],
		required: true //The photo is required
	}
};
```

### time

| Attributes | Type   | Description                                                                                                                                           |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| required   | bool   | Set if this field is required (default : true)                                                                                                        |
| format     | string | Set the format of the input value and the min/max attributes (default : HH:mm:ss)                                                                     |
| min        | int    | Set the minimal date that the input can be (value not included)                                                                                       |
| max        | int    | Set the maximal date that the input can be (value not included)                                                                                       |
| minAge     | object | Set the dinamical minimal date that the input can be <br>Allow keys are: <ul><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> |
| maxAge     | object | Set the dinamical maximal date that the input can be <br>Allow keys are: <ul><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> |

```javascript
var objSchema = {
	timeSend: {
		type: 'time',
		format: 'HH:mm:ss', //The timeSend must be a time in this format, min and max attributes if setted must be in this format
		min: '00:00:01', //The timeSend must bee grater than 1 second
		max: '10:59:59', //The timeSend must belower than 11 a.m.
		required: true //The timeSend is required
	},
	timeBirth: {
		type: 'time',
		minage: {
			hours: 1 //The timeBirth must be min 1 hours old from now
		},
		maxage: {
			hours: 10 //The timeBirth must be max 10 hours old from now
		}
		//For more details of this object look below
	}
};
```

# System structure

When the system receives a request, the validator starts working.
We have a recursive \_val function in the main file which analyzes the input received for each element of the schema, which is recursive for object and array inputs.

When the validator understands the type of input, it calls the validator method of this data type and checks whether the data passed respects the scheme.
