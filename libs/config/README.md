# Lib: @c/config

This lib used to manage configuration files.

By design, it's just parse the consumer service package.json file and return the config object.

## How to use

```js
const config = require("@c/config");
console.log("My service port is: " + config.port);
```
