[<- Back](https://github.com/Runtheons/runtheons-validate#type)

# BOOLEAN

- [Parameter](https://github.com/Runtheons/runtheons-validate/blob/master/doc/boolean.md#parameter)
- [Example of use](https://github.com/Runtheons/runtheons-validate/blob/master/doc/boolean.md#example-of-use)

## Parameter

| Parameter | Type | Description                                    |
| --------- | ---- | ---------------------------------------------- |
| required  | bool | Set if this field is required (default : true) |

## Example of Use

We want receive a object that must contais attribute `checked` as a boolean

```javascript
const Validator = require('@runtheons/validate');

let objSchema = {
	checked: {
		type: Validator.BOOLEAN,
		required: Validator.REQUIRED
	}
};
```
