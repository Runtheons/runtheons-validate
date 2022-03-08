[<- Back](https://github.com/Runtheons/runtheons-validate#type)

# TIME

- [Parameter](https://github.com/Runtheons/runtheons-validate/blob/master/doc/time.md#parameter)
- [Example of use](https://github.com/Runtheons/runtheons-validate/blob/master/doc/time.md#example-of-use)

## Parameter

| Parameter | Type   | Description                                                                       |
| --------- | ------ | --------------------------------------------------------------------------------- |
| required  | bool   | Set if this field is required (default : true)                                    |
| format    | string | Set the format of the input value and the min/max attributes (default : HH:mm:ss) |
| min       | int    | Set the minimal date that the input can be (value not included)                   |
| max       | int    | Set the maximal date that the input can be (value not included)                   |

We use [moment.js](https://momentjs.com/docs/#/manipulating/ 'moment.js') for manipulate the date, so see for more datails

## Example of Use

We want receive a object that must contais attribute `timeSend` as a time in format HH:mm:ss, that must be in range 00:00:00 and 11:00:00

```javascript
const Validator = require('@runtheons/validate');

var objSchema = {
	timeSend: {
		type: Validator.TIME,
		format: 'HH:mm:ss',
		min: '00:00:00',
		max: '11:00:00',
		required: true // Could be omitted
	}
};
```
