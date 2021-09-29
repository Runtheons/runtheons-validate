[<- Back](https://github.com/iamousseni/runtheons-validate#type)

# STRING

- [Parameter](https://github.com/iamousseni/runtheons-validate/blob/tree/master/doc/string.md#parameter)
- [Example of use](https://github.com/iamousseni/runtheons-validate/blob/tree/master/doc/string.md#example-of-use)

## Parameter

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| required  | bool   | Set if this field is required (default : true)                   |
| notEmpty  | bool   | Set if this field must be a not empty string (default : false)   |
| minLength | int    | Set the minimal length that the input can be (value is included) |
| maxLength | int    | Set the maximal length that the input can be (value is included) |
| reg       | string | A regular expression that must match the input                   |

## Example of Use

We want receive a object that must contais attribute `username` as a string, that must be not a empty string, that is length between 8 and 150 char, but only alphabetich char

```javascript
const Validator = require('@runtheons-validate');

var objSchema = {
	username: {
		type: Validator.STRING,
		notEmpty: true,
		minLength: 8,
		maxLength: 150,
		reg: '[a-zA-Z]*',
		required: true
	}
};
```
