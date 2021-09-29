[<- Back](https://github.com/iamousseni/runtheons-validate#type)

# TIME

- [Parameter](https://github.com/iamousseni/runtheons-validate/doc/time#parameter)
- [Example of use](https://github.com/iamousseni/runtheons-validate/doc/time#example-of-use)

## Parameter

| Parameter | Type   | Description                                                                                                                                           |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| required  | bool   | Set if this field is required (default : true)                                                                                                        |
| format    | string | Set the format of the input value and the min/max attributes (default : HH:mm:ss)                                                                     |
| min       | int    | Set the minimal date that the input can be (value not included)                                                                                       |
| max       | int    | Set the maximal date that the input can be (value not included)                                                                                       |
| minAge    | object | Set the dinamical minimal date that the input can be <br>Allow keys are: <ul><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> |
| maxAge    | object | Set the dinamical maximal date that the input can be <br>Allow keys are: <ul><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> |

We use [moment.js](https://momentjs.com/docs/#/manipulating/ 'moment.js') for manipulate the date, so see for more datails

## Example of Use

We want receive a object that must contais attribute `timeSend` as a time in format HH:mm:ss, that must be in range 00:00:00 and 11:00:00, then must contains attribute `timeBirth` as a time, that must be 14 years, 5 mounths and hour old, but max 99 years and 10 hours old

```javascript
const Validator = require('@runtheons-validate');

var objSchema = {
	timeSend: {
		type: Validator.TIME,
		format: 'HH:mm:ss',
		min: '00:00:00',
		max: '11:00:00',
		required: true // Could be omitted
	},
	timeBirth: {
		type: Validator.TIME,
		minAge: {
			hours: 1
		},
		maxAge: {
			hours: 10
		}
	}
};
```
