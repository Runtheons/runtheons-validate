[<- Back](https://github.com/iamousseni/runtheons-validate#type)

# BOOLEAN

- [Parameter](https://github.com/iamousseni/runtheons-validate/tree/master/doc/boolean.md#parameter)
- [Example of use](https://github.com/iamousseni/runtheons-validate/tree/master/doc/boolean.md#example-of-use)

## Parameter

| Parameter | Type | Description                                    |
| --------- | ---- | ---------------------------------------------- |
| required  | bool | Set if this field is required (default : true) |

## Example of Use

We want receive a object that must contais attribute `checked` as a boolean

```javascript
const Validator = require('@runtheons-validate');

var objSchema = {
	checked: {
		type: Validator.BOOLEAN,
		required: true
	}
};
```
