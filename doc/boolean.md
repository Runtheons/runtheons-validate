[<- Back](https://github.com/iamousseni/runtheons-validate/tree/2.4.3#type)

# BOOLEAN

- [Parameter](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/boolean#parameter)
- [Example of use](https://github.com/iamousseni/runtheons-validatetree/2.4.3/doc/boolean#example-of-use)

## Parameter

| Attributes | Type | Description                                    |
| ---------- | ---- | ---------------------------------------------- |
| required   | bool | Set if this field is required (default : true) |

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
