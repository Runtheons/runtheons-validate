[<- Back](https://github.com/Runtheons/runtheons-validate#type)

# INTEGER

- [Parameter](https://github.com/Runtheons/runtheons-validate/blob/master/doc/integer.md#parameter)
- [Example of use](https://github.com/Runtheons/runtheons-validate/blob/master/doc/integer.md#example-of-use)

## Parameter

| Parameter | Type | Description                                                     |
| --------- | ---- | --------------------------------------------------------------- |
| required  | bool | Set if this field is required (default : true)                  |
| min       | int  | Set the minimal value that the input can be (value is included) |
| max       | int  | Set the maximal value that the input can be (value is included) |

## Example of Use

We want receive a object that must contais attribute `id` as an integer, that is greater than 0 and lower than 1000

```javascript
const ValidatorConst = require('@runtheons/validate/Validator');

var objSchema = {
	id: {
		type: ValidatorConst.INTEGER,
		min: 0,
		max: 1000,
		required: true // Could be omitted
	}
};
```
