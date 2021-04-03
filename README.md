# AS-Console
**Isomorphic Console Imported To AssemblyScript**

## Installation

```bash
~ npm install as-console
```

## Requirements

- Add --exportRuntime flag

## Usage

**Loader**

```js

const fs = require('fs')

const loader = require('@assemblyscript/loader')

+ let wasmModule

+ const consoleImports = require('as-console')

const imports = {
    ...eval(consoleImports)
}

- const wasmModule = loader.instantiateSync(wasm, imports)

+ const wasmModule = loader.instantiateSync(wasm, imports)

module.exports = wasmModule.exports

```

**AssemblyScript**

```js

import { console } from 'as-console'

console.log('Hello From AssemblyScript')

```