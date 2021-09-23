# Cooldown

## Example

```js
const CooldownManager = require("cooldown");

const cm = new CooldownManager(50000);

cm.set("someId");

cm.waitToEnd("someId").then(() => {
  console.log("Ended.");
});
```
