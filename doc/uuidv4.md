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
const ValidatorConst = require('@runtheons/validate/Validator');

var objSchema = {
	uuidV4: {
		type: ValidatorConst.UUIDV4,
		required: true
	}
};
```
