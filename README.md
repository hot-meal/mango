<p align="center">
	<img src="./logo.png" alt="a mango" width="250"/>
<p>

# mango.js

A tiny js templating framework. ~400 bytes gzipped

### Features
 * Basic interpolation: 
   * `{{=value}}`
 * Unclean interpolation: 
   * `{{%unsafe_value}}`
 * Variable expansion: 
   * `{{=User.account.number}}`
 * If..else: 
   * `{{value}} <<markup>> {{:value}} <<alternate markup>> {{/value}}`
 * If falsy: 
   * `{{!value}} <<markup>> {{/!value}}`
 * Iteration: 
   * `{{@object_value}} {{=_key}}:{{=_val}} {{/@object_value}}`
 
 
 - Supports multi-line templates (no need to remove newlines)
 - Use and render the same template multiple times with different data
 - Works in all browsers

### Demo

```javascript
let myTemplate = new mango("<div>Hello {{=name}}</div>");
document.body.innerHtml = myTemplate.render({name: "Mango!"});
```
