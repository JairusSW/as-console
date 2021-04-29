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

**Loader**

```js

const fs = require('fs')

const loader = require('@assemblyscript/loader')

+ const consoleImports = require('as-console')

+ const asConsole = new consoleImports()

const imports = {
    ...asConsole.wasmImports
}

const wasmModule = loader.instantiateSync(wasm, imports)

+ asConsole.wasmExports = wasmModule.exports

module.exports = wasmModule.exports

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
console.log(new DataView(String.UTF8.encode('Hello From AssemblyScript')))
// -- DatView
```