<h5 align="center">
<pre>
 _____  _____       _____  _____  _____  _____  _____  __     _____ 
|  _  ||   __| ___ |     ||     ||   | ||   __||     ||  |   |   __|
|     ||__   ||___||   --||  |  || | | ||__   ||  |  ||  |__ |   __|
|__|__||_____|     |_____||_____||_|___||_____||_____||_____||_____|
v1.0.1
</pre>
</h5>

## Inspiration
AssemblyScript's implementation of `console.log` only accepts a `string`.
As a result, you can only log `string`.
```js
// 😢
const foo = 3.14;
console.log(foo);

> ERROR: f64 not assignable to string. Must call .toString()!
```

This library fixes that
```js
// 😊
const foo = 3.14;
console.log(foo);
// 3.14
```
Not only can you log primitive types, but it also supports

- String
- Integers
- Floats
- Booleans
- Null
- Map
- Set
- Array

## Installation

```bash
npm install as-console
```

## Usage

```js
import * as console from "as-console";

console.log("Hello from AssemblyScript!");
console.log([
    "It supports other types"
]);
console.log([["Other","than","strings"]]);

const set = new Set<string[]>();
set.add(["and complex types"]);
console.log(set);
```

## Contact

Contact me at:

Email: `me@jairus.dev`

GitHub: `JairusSW`

Discord: `jairussw`

## Issues

Please submit an issue to https://github.com/JairusSW/as-console/issues if you find anything wrong with this library