[<- Back](https://github.com/Runtheons/runtheons-validate#type)

# EMAIL

- [Parameter](https://github.com/Runtheons/runtheons-validate/blob/master/doc/email.md#parameter)
- [Example of use](https://github.com/Runtheons/runtheons-validate/blob/master/doc/email.md#example-of-use)

## Parameter

| Parameter | Type | Description                                    |
| --------- | ---- | ---------------------------------------------- |
| required  | bool | Set if this field is required (default : true) |

## Example of Use

We want receive a object that must contais attribute `email` as an email

```javascript
const ValidatorConst = require('@runtheons/validate/Validator');

var objSchema = {
	email: {
		type: ValidatorConst.EMAIL,
		required: true
	}
};
```
