# AS-Console

**Console for AssemblyScript**

## Installation

```bash
~ npm install as-console
```

## Features

- WASI Implementation
- JS Bindings
- NodeJS support
- Browser support
- Lunatic support
- Wasmtime support

## Requirements

*WASI*

- WASI-enabled runtime

*Bindings*

- AssemblyScript Loader/ASbind
- `--exportRuntime` flag

## Usage (WASI)

```js
import { console } from 'as-console/wasi'

console.log('Hello From AssemblyScript!')
// -- Strings
console.log(1234567890)
// -- Numbers
console.log(new Uint8Array(5))
// -- UintArray
console.log(new Map<string, string>().set('Hello', 'World'))
// -- Map
```

## Usage (Bindings)

**JS/Node**

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

**AssemblyScript**

```js
import { console } from 'as-console'

console.log('Hello From AssemblyScript!')
// -- Strings
console.log(1234567890)
// -- Numbers
console.log(new Uint8Array(5))
// -- UintArray
console.log(new Map<string, string>().set('Hello', 'World'))
// -- Map
```
