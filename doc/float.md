[<- Back](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#type)

# FLOAT

- [Parameter](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/float#parameter)
- [Example of use](https://github.com/iamousseni/runtheons-validatetree/2.4.3/doc/float#example-of-use)

## Parameter

| Attributes | Type | Description                                                     |
| ---------- | ---- | --------------------------------------------------------------- |
| required   | bool | Set if this field is required (default : true)                  |
| min        | int  | Set the minimal value that the input can be (value is included) |
| max        | int  | Set the maximal value that the input can be (value is included) |

## Example of Use

We want receive a object that must contais attribute `price` as an float, that is greater than 1.00 and lower than 100

```javascript
const Validator = require('@runtheons-validate');

var objSchema = {
	price: {
		type: Validator.FLOAT,
		min: 1,
		max: 100,
		required: true // Could be omitted
	}
};
```