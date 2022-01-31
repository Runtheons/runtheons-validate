[<- Back](https://github.com/Runtheons/runtheons-validate#type)

# UUIDV4

- [Parameter](https://github.com/Runtheons/runtheons-validate/blob/master/doc/uuidv4.md#parameter)
- [Example of use](https://github.com/Runtheons/runtheons-validate/blob/master/doc/uuidv4.md#example-of-use)

## Parameter

| Parameter | Type | Description                                    |
| --------- | ---- | ---------------------------------------------- |
| required  | bool | Set if this field is required (default : true) |

## Example of Use

We want receive a object that must contais attribute `uuidV4` as an uuidV4

```javascript
const Validator = require('@runtheons-validate');

var objSchema = {
	uuidV4: {
		type: Validator.UUIDV4,
		required: true
	}
};
```
