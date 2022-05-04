[<- Back](https://github.com/Runtheons/runtheons-validate#type)

# DATE

- [Parameter](https://github.com/Runtheons/runtheons-validate/blob/master/doc/date.md#parameter)
- [Example of use](https://github.com/Runtheons/runtheons-validate/blob/master/doc/date.md#example-of-use)

## Parameter

| Parameter | Type   | Description                                                                                                                                                  |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| required  | bool   | Set if this field is required (default : true)                                                                                                               |
| format    | string | Set the format of the input value and the min/max attributes (default : YYYY-MM-DD)                                                                          |
| min       | int    | Set the minimal date that the input can be (value is included)                                                                                               |
| max       | int    | Set the maximal date that the input can be (value is included)                                                                                               |
| minAge    | object | Set the dinamical minimal date that the input can be <br>Allow keys are: <ul><li>years</li><li> quarters</li><li>months</li><li>weeks</li><li>days</li></ul> |
| maxAge    | object | Set the dinamical maximal date that the input can be <br>Allow keys are: <ul><li>years</li><li> quarters</li><li>months</li><li>weeks</li><li>days</li></ul> |

We use [moment.js](https://momentjs.com/docs/#/manipulating/ 'moment.js') for manipulate the date, so see for more datails

## Example of Use

We want receive a object that must contais attribute `dateSend` as a date in format DD/MM/YYYY, that must be in the year 2020, then must contains attribute `dateBirth` as a date, that must be 14 years and 5 mounths old, but max 99 years old

```javascript
const Validator = require('@runtheons/validate');

var objSchema = {
	dateSend: {
		type: Validator.DATE,
		format: 'DD/MM/YYYY',
		min: '01/01/2020',
		max: '31/12/2020',
		required: Validator.REQUIRED
	},
	dateBirth: {
		type: Validator.DATE,
		minAge: {
			years: 14,
			mounths: 5
		},
		maxAge: {
			years: 99
		}
	}
};
```
