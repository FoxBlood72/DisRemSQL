# hastebin-post
An unofficial https://www.hastebin.com/ library for easier hastebin making

# Install
Stable release:  
```sh
$ npm install hastebin-post
# or with yarn
$ yarn add hastebin-post
```  
Or for GitHub development version:  
```sh
$ npm install FlareonUwU/hastebin-post
# or with Yarn
$ yarn add FlareonUwU/hastebin-post
``` 


# Usage
```js
const hastebin = require("hastebin-post");
  
hastebin.post("string")
  .then((url) => console.log(`URL: ${url}`));
```

# License
MIT Copyright 2018-2019 FlareonUwU
