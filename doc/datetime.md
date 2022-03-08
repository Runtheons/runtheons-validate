[<- Back](https://github.com/Runtheons/runtheons-validate#type)

# DATETIME

- [Parameter](https://github.com/Runtheons/runtheons-validate/blob/master/doc/datetime.md#parameter)
- [Example of use](https://github.com/Runtheons/runtheons-validate/blob/master/doc/datetime.md#example-of-use)

## Parameter

| Parameter | Type   | Description                                                                                                                                                                                                                     |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| required  | bool   | Set if this field is required (default : true)                                                                                                                                                                                  |
| format    | string | Set the format of the input value and the min/max attributes (default : YYYY-MM-DD HH:mm:ss)                                                                                                                                    |
| min       | int    | Set the minimal date that the input can be (value not included)                                                                                                                                                                 |
| max       | int    | Set the maximal date that the input can be (value not included)                                                                                                                                                                 |
| minAge    | object | Set the dinamical minimal date that the input can be <br>Allow keys are: <ul><li>years</li><li> quarters</li><li>months</li><li>weeks</li><li>days</li><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> |
| maxAge    | object | Set the dinamical maximal date that the input can be <br>Allow keys are: <ul><li>years</li><li> quarters</li><li>months</li><li>weeks</li><li>days</li><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> |

We use [moment.js](https://momentjs.com/docs/#/manipulating/ 'moment.js') for manipulate the date, so see for more datails

## Example of Use

We want receive a object that must contais attribute `dateSend` as a datetime in format DD/MM/YYYY HH:mm:ss, that must be in the year 2020, from 00:10:30 of 1st Jannuary to 05:30:00 of 31st December, then must contains attribute `dateBirth` as a datetime, that must be 14 years, 5 mounths and hour old, but max 99 years and 10 hours old

```javascript
const Validator = require('@runtheons/validate');

var objSchema = {
	dateSend: {
		type: Validator.DATETIME,
		format: 'DD/MM/YYYY HH:mm:ss',
		min: '01/01/2020 00:10:30',
		max: '31/12/2020 05:30:00',
		required: true // Could be omitted
	},
	dateBirth: {
		type: Validator.DATETIME,
		minAge: {
			years: 14,
			mounths: 5,
			hours: 1
		},
		maxAge: {
			years: 99,
			hours: 10
		}
	}
};
```
