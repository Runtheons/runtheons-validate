[<- Back](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#type)

# EMAIL

- [Parameter](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/email#parameter)
- [Example of use](https://github.com/iamousseni/runtheons-validatetree/2.4.3/doc/email#example-of-use)

## Parameter

| Parameter | Type | Description                                    |
| --------- | ---- | ---------------------------------------------- |
| required  | bool | Set if this field is required (default : true) |

## Example of Use

We want receive a object that must contais attribute `email` as an email

```javascript
const Validator = require('@runtheons-validate');

var objSchema = {
	email: {
		type: Validator.EMAIL,
		required: true
	}
};
```
