# Runtheons Validate

npm package to validate endpoints

# Index

- [Introduction](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#introduction)
- [Getting started](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#getting-started)
  - [Prerequisites](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#prerequisites)
  - [Installation](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#installation)
- [Example of use](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#example-of-use)
- [Use](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#use)
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

# Use

It is necessary to define an object schema that defines the input you want to receive, for each element of the object it is necessary to define its type:

## Type

The types of inputs are:

- [INTEGER](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/integer.md)
- [FLOAT](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/float.md)
- [boolean](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/boolean.md)
- [string](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/string.md)
- [email](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/email.md)
- [file](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/file.md)
- [date](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/date.md)
- [datetime](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/datetime.md)
- [time](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/time.md)
  - [Allowed data format key](https://github.com/iamousseni/runtheons-validate#Allowed-data-format-key 'Allowed data format key')

### boolean

| Attributes | Type | Description                                    |
| ---------- | ---- | ---------------------------------------------- |
| required   | bool | Set if this field is required (default : true) |

```javascript
var objSchema = {
	checked: {
		type: 'boolean'
		required: true	//The boolean is required
	}
}
```

### string

| Attributes | Type   | Description                                                       |
| ---------- | ------ | ----------------------------------------------------------------- |
| required   | bool   | Set if this field is required (default : true)                    |
| notEmpty   | bool   | Set if this field must be a not empty string (default : false)    |
| minLength  | int    | Set the minimal length that the input can be (value not included) |
| maxLength  | int    | Set the maximal length that the input can be (value not included) |
| reg        | string | A regular expression that must match the input                    |

```javascript
var objSchema = {
	username: {
		type: 'string',
		notEmpty: true, //The username must not be ""
		minLength: 9, //The username length must be greater than 9 char
		maxLength: 1000, //The username length must be lower than 1000 char,
		reg: '[a-zA-Z]*', //The username must match this pattern
		required: true //The username is required
	}
};
```

### email

| Attributes | Type | Description                                    |
| ---------- | ---- | ---------------------------------------------- |
| required   | bool | Set if this field is required (default : true) |

```javascript
var objSchema = {
	email: {
		type: 'email',
		required: true //The email is required
	}
};
```

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

### date

| Attributes | Type   | Description                                                                                                                                                  |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| required   | bool   | Set if this field is required (default : true)                                                                                                               |
| format     | string | Set the format of the input value and the min/max attributes (default : YYYY-MM-DD)                                                                          |
| min        | int    | Set the minimal date that the input can be (value not included)                                                                                              |
| max        | int    | Set the maximal date that the input can be (value not included)                                                                                              |
| minAge     | object | Set the dinamical minimal date that the input can be <br>Allow keys are: <ul><li>years</li><li> quarters</li><li>months</li><li>weeks</li><li>days</li></ul> |
| maxAge     | object | Set the dinamical maximal date that the input can be <br>Allow keys are: <ul><li>years</li><li> quarters</li><li>months</li><li>weeks</li><li>days</li></ul> |

```javascript
var objSchema = {
	dateSend: {
		type: 'date',
		format: 'DD/MM/YYYY', //The dateSend must be a date in this format, min and max attributes if setted must be in this format
		min: '01/01/2020', //The dateSend must be grater than 1st January 2020
		max: '31/12/2020', //The dateSend must be lower than 31th December 2020
		required: true //The dateSend is required
	},
	dateBirth: {
		type: 'date',
		minAge: {
			years: 14, //The dateBirth must be min 14 years and 5 mouth old from now
			mounths: 5
		},
		maxAge: {
			years: 99 //The dateBirth must be max 99 years old from now
		}
		//For more details about this oubject see below
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

### datetime

| Attributes | Type   | Description                                                                                                                                                                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| required   | bool   | Set if this field is required (default : true)                                                                                                                                                                                  |
| format     | string | Set the format of the input value and the min/max attributes (default : YYYY-MM-DD HH:mm:ss)                                                                                                                                    |
| min        | int    | Set the minimal date that the input can be (value not included)                                                                                                                                                                 |
| max        | int    | Set the maximal date that the input can be (value not included)                                                                                                                                                                 |
| minAge     | object | Set the dinamical minimal date that the input can be <br>Allow keys are: <ul><li>years</li><li> quarters</li><li>months</li><li>weeks</li><li>days</li><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> |
| maxAge     | object | Set the dinamical maximal date that the input can be <br>Allow keys are: <ul><li>years</li><li> quarters</li><li>months</li><li>weeks</li><li>days</li><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> |

```javascript
var objSchema = {
	dateSend: {
		type: 'datetime',
		format: 'DD/MM/YYYY HH:mm:ss', //The dateSend must be a date in this format, min and max attributes if setted must be in this format
		min: '01/01/2020 00:10:30', //The dateSend must be grater than 1st January 2020 at 00:10:30
		max: '31/12/2020 05:30:00', //The dateSend must be lower than 31th December 2020 at 05:30:00
		required: true //The dateSend is required
	},
	dateBirth: {
		type: 'datetime',
		minAge: {
			years: 14, //The dateBirth must be min 14 years, 5 mouth and 1 hours old from now
			mounths: 5,
			hours: 1
		},
		maxAge: {
			years: 99, //The dateBirth must be max 99 years and 10 hours old from now
			hours: 10
		}
		//For more details about this oubject see below
	}
};
```

#### Allowed data format key

Look [moment.js](https://momentjs.com/docs/#/manipulating/ 'moment.js'), for more datails

| Input                  | Example        | Description                                                                  |
| ---------------------- | -------------- | ---------------------------------------------------------------------------- |
| YYYY                   | 2014           | 4 or 2 digit year. Note: Only 4 digit can be parsed on strict mode           |
| YY                     | 14             | 2 digit year                                                                 |
| Q                      | 1..4           | Quarter of year. Sets month to first month in quarter.                       |
| M MM                   | 1..12          | Month number                                                                 |
| MMM MMMM               | December       | Month name(ENG)                                                              |
| D DD                   | 1..31          | Day of month                                                                 |
| Do                     | 1st..31st      | Day of month with ordinal                                                    |
| DDD DDDD               | 1..365         | Day of year                                                                  |
| X                      | 1410715640.579 | Unix timestamp                                                               |
| x                      | 1410715640579  | Unix timestamp in milliseconds                                               |
| H HH                   | 0..23          | Hours (24 hour time)                                                         |
| h hh                   | 1..12          | Hours (12 hour time used with a A.)                                          |
| k kk                   | 1..24          | Hours (24 hour time from 1 to 24)                                            |
| a A                    | am pm          | Post or ante meridiem (Note the one character a p are also considered valid) |
| m mm                   | 0..59          | Minutes                                                                      |
| s ss                   | 0..59          | Seconds                                                                      |
| S SS SSS ... SSSSSSSSS | 0..999999999   | Fractional seconds                                                           |
| Z ZZ                   | +12:00         | Offset from UTC as +-HH:mm, +-HHmm, or Z                                     |

# System structure

When the system receives a request, the validator starts working.
We have a recursive \_val function in the main file which analyzes the input received for each element of the schema, which is recursive for object and array inputs.

When the validator understands the type of input, it calls the validator method of this data type and checks whether the data passed respects the scheme.
