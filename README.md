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

+ const consoleImports = require('as-console')

+ const asConsole = new consoleImports()

const imports = {
    ...asConsole.wasmImports
}

+ const wasmModule = loader.instantiateSync(wasm, imports)

+ asConsole.wasmExports = wasmModule.exports

module.exports = wasmModule.exports

```

**AssemblyScript**

```js

import { console } from 'as-console'

console.log('Hello From AssemblyScript')

```