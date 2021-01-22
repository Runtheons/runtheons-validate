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
- [int](https://github.com/iamousseni/runtheons-validate#int "int")
- [float](https://github.com/iamousseni/runtheons-validate#float "float")
- [double](https://github.com/iamousseni/runtheons-validate#double "double")
- [string](https://github.com/iamousseni/runtheons-validate#string "string")
- [email](https://github.com/iamousseni/runtheons-validate#email "email")
- [file](https://github.com/iamousseni/runtheons-validate#file "file")
- [date](https://github.com/iamousseni/runtheons-validate#date "date")
- [datetime](https://github.com/iamousseni/runtheons-validate#datetime "datetime")
- [time](https://github.com/iamousseni/runtheons-validate#time "time")
	- [Allowed data format key](https://github.com/iamousseni/runtheons-validate#Allowed-data-format-key "Allowed data format key")

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

New type 

## int
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| min        | int   | Set the minimal value that the input can be (value not included) |
| max        | int   | Set the maximal value that the input can be (value not included) |
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    id: {
        type: 'int',
	min: 0, 	//The unique number start at 1
	max: 1000, 	//Only 999 users are allowed
        required: true	//Is required
    }
}
```

## float
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| min        | int   | Set the minimal value that the input can be (value not included)  |
| max        | int   | Set the maximal value that the input can be (value not included)  |
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    prize: {
        type: 'float',
	min: 0.99, 	//The minimal value is 1€
	max: 1000, 	//Maximal prize is 999,99€
        required: true	//Is required
    }
}
```

## double
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| min        | int   | Set the minimal value that the input can be (value not included)  |
| max        | int   | Set the maximal value that the input can be (value not included)  |
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    prize: {
        type: 'double',
	min: 0.99, 	//The minimal value is 1€
	max: 1000, 	//Maximal prize is 999,99€
        required: true	//Is required
    }
}
```

## string
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| minlength  | int   | Set the minimal length that the input can be (value not included) |
| maxlength | int   | Set the maximal length that the input can be (value not included) |
| reg   | string  | A regular expression that must match the input |
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    username: {
        type: 'string',
	minlength: 9, 		//The string size must be greater than 8 char
	maxlength: 1000,	//The string size must be lower than 999 char,
	reg: "[a-zA-Z]*",	//The string must match this pattern
        required: true		//Is required
    }
}
```

## email
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    email: {
        type: 'email',
        required: true		//Is required
    }
}
```

## file
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| mimetype   | string or Array of string  | A regular expression or array of regular expressions that must match the file mimetype |
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    photo: {
        type: 'file',
	mimetype: [
		"image/png",	//Only this type of data are allowed
		"image/jpg",
		"image/gif"
	],
        required: true		//Is required
    }
}
```

## date
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| min        | int   | Set the minimal date that the input can be (value not included)  |
| max        | int   | Set the maximal date that the input can be (value not included)  |
| minage     | object| Set the dinamical minimal date that the input can be <br />Allow keys are: years, quarters, months, weeks, days <br /> Es. set the key as 'years' and the value as 18, for check if is greater than 18 years old|
| maxage     | object| Set the dinamical maximal date that the input can be <br />Allow keys are: years, quarters, months, weeks, days <br /> Es. set the key as 'years' and the value as 18, for check if is greater than 18 years old|
| format | string | Set the format of the input value (and the min/max attributes), default value: YYYY-MM-DD <br />See below for allowed key|
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    dateSend: {
        type: 'date',
	format: "DD/MM/YYYY",	//The input must be in this format,
	min: "01/01/2020",	//All the input date must be grater than 1st January 2020
	max: "31/12/2020",	//All the input date must be lower than 31th December 2020
				//So the input date must be in the 2020 year
				//NB: The min and max format must be the same of the format attribute
        required: true		//Is required
    },
    dateBirth: {
        type: 'date',
	format: "DD/MM/YYYY",	//The input must be in this format,
	minage: {
		"years": 14,	//All the input date must be grater than 14 years and 5 mouth old from now
		"mounths": 5
	},
	maxage: {
		"years": 99	//All the input date must be lower than 99 years old from now
	},
				//For more details of this object look below
        required: true		//Is required
    }
}
```

## time
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| min        | int   | Set the minimal time that the input can be |
| max        | int   | Set the maximal time that the input can be |
| minage     | object| Set the dinamical minimal time that the input can be <br /> Allow keys are: hours, minutes, seconds, milliseconds <br/> Es. set the key as 'hours' and the value as 1, for check if is greater than 1 hour|
| maxage     | object| Set the dinamical maximal time that the input can be <br />Allow keys are: hours, minutes, seconds, milliseconds <br /> Es. set the key as 'hours' and the value as 1, for check if is greater than 1 hour|
| format | string | Set the format of the input value (and the min/max attributes), default value: HH:mm:ss <br />See below for allowed key|
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    timeSend: {
        type: 'time',
	format: "HH:mm:ss",	//The input must be in this format,
	min: "00:00:01",	//All the input time must be grater than 1 second
	max: "10:59:59",	//All the input date must be lower than 11 a.m.
				//NB: The min and max format must be the same of the format attribute
        required: true		//Is required
    },
    timeBirth: {
        type: 'time',
	format: "HH:mm:ss",	//The input must be in this format,
	minage: {
		"hours": 1	//All the input time must be grater than 1 hours from now
	},
	maxage: {
		"hours": 10	//All the input time must be lower than 10 hours from now
	},
				//For more details of this object look below
        required: true		//Is required
    }
}
```

## datetime
| parameters | type |                                             |
|------------|-------|---------------------------------------------|
| min        | int   | Set the minimal datetime that the input can be |
| max        | int   | Set the maximal datetime that the input can be |
| minage     | object| Set the dinamical minimal datetime that the input can be <br /> Allow keys are: years, quarters, months, weeks, days, hours, minutes, seconds, milliseconds <br /> Es. set the key as 'years' and the value as 18, for check if is greater than 18 years old|
| maxage     | object| Set the dinamical maximal datetime that the input can be <br /> Allow keys are: years, quarters, months, weeks, days, hours, minutes, seconds, milliseconds <br />Es. set the key as 'years' and the value as 18, for check if is greater than 18 years old|
| format | string | Set the format of the input value (and the min/max attributes), default value: YYYY-MM-DD HH:mm:ss <br />See below for allowed key|
| required   | bool  | Set if this field is required               |

```javascript
var objSchema = {
    datetimeSend: {
        type: 'datetime',
	format: "DD/MM/YYYY HH:mm:ss",	//The input must be in this format,
	min: "01/01/2020 00:00:01",	//All the input datetime must be grater than 1st January 2020 at 00:00:01
	max: "31/12/2020 10:59:59",	//All the input datetime must be lower than 31th December 2020 at 11:00:00
					//NB: The min and max format must be the same of the format attribute
        required: true			//Is required
    },
    datetimeBirth: {
        type: 'datetime',
	format: "DD/MM/YYYY HH:mm:ss",	//The input must be in this format,
	minage: {
		"years": 14,		//All the input datetime must be grater than 14 years, 5 mouth and 1 hour old from now
		"mounths": 5,
		"hours": 1
	},
	maxage: {
		"years": 99		//All the input datetime must be lower than 99 years old from now
	},
					//For more details of this object look below
        required: true			//Is required
    }
}
```

### Allowed data format key

Look [moment.js](https://momentjs.com/docs/#/manipulating/ "moment.js"), for more datails

|Input|	Example	|Description|
|---|---|---|
|YYYY|	2014	|4 or 2 digit year. Note: Only 4 digit can be parsed on strict mode|
|YY	|14	|2 digit year|
|Q	|1..4	|Quarter of year. Sets month to first month in quarter.|
|M MM|	1..12	|Month number|
|MMM MMMM	|December	|Month name(ENG)|
|D DD|	1..31	|Day of month|
|Do|	1st..31st	|Day of month with ordinal|
|DDD DDDD|	1..365	|Day of year|
|X|	1410715640.579	|Unix timestamp|
|x|	1410715640579	|Unix timestamp in milliseconds|
|H HH|	0..23|	Hours (24 hour time)|
|h hh|	1..12|	Hours (12 hour time used with a A.)|
|k kk|	1..24|	Hours (24 hour time from 1 to 24)|
|a A|	am pm|	Post or ante meridiem (Note the one character a p are also considered valid)|
|m mm|	0..59|	Minutes|
|s ss|	0..59|	Seconds|
|S SS SSS ... SSSSSSSSS|	0..999999999|	Fractional seconds|
|Z ZZ|	+12:00|	Offset from UTC as +-HH:mm, +-HHmm, or Z|


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
    - validate/data.js > The export data type of the validator
	- superData.js > The super class of a data
	- numberData.js > The class of a number data, it provides int, float and double type
	- stringData.js > The class of a string data, it provides string and email type
	- dateData.js > The class of a date data, it provides date, datetime and time type
	- fileData.js > The class of a file data, it provides file type
    - validate/Runtheons_validate.js > Main program of the validator
