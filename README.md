# AS-Console
**Isomorphic Console Imported To AssemblyScript**

## Installation

```bash
~ npm install as-console
```

## Features

- Supports almost any datatype
- Logs strings, functions, numbers, arrays, and more!

## Requirements

- Add --exportRuntime flag

## Usage

**NodeJS**

```js
...
const loader = require('@assemblyscript/loader')
+ const ConsoleImport = require('as-console/imports')
+ const Console = new ConsoleImport()
const imports = {
+     ...Console.wasmImports
}
const wasmModule = loader.instantiateSync(..., imports);
+ Console.wasmExports = wasmModule.exports
...
```

**Browser**

```js
...
+ import { ConsoleImport } from 'as-console/imports.esm.js'
+ const Console = new ConsoleImport()
const imports = {
+     ...Console.wasmImports
}
const wasmModule = loader.instantiateSync(..., imports);
+ Console.wasmExports = wasmModule.exports
...
```

**AssemblyScript**

```js

import { console } from 'as-console'

console.log('Hello From AssemblyScript')
// -- Strings
console.log(1234567890)
// -- Numbers
console.log(new Uint8Array(5))
// -- UintArray
console.log(new Map<string, string>().set('hello', 'world'))
// -- Map
```