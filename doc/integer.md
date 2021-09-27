[<- Back](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc)

# INTEGER

- [Attribute](https://github.com/iamousseni/runtheons-validate/tree/2.4.3/doc/integer#attribute)
- [Example of use](https://github.com/iamousseni/runtheons-validatetree/2.4.3/doc/integer#example-of-use)

## Attribute

| Attributes | Type | Description                                                      |
| ---------- | ---- | ---------------------------------------------------------------- |
| required   | bool | Set if this field is required (default : true)                   |
| min        | int  | Set the minimal value that the input can be (value not included) |
| max        | int  | Set the maximal value that the input can be (value not included) |

## Example of Use

We want receive a object that must contais attribute `id` as an integer, that is greater than 0 and lower than 1000

```javascript
const Validator = require('@runtheons-validate');

var objSchema = {
	id: {
		type: Validator.INTEGER,
		min: 0,
		max: 1000,
		required: true // Could be omitted
	}
};
```
