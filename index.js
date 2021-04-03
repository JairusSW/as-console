const fs = require('fs')

const loader = require('as-bind').AsBind

const bind = require('as-console/bind')

const imports = {}

bind(imports)

const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + '/build/optimized.wasm'), imports)

module.exports = wasmModule.exports