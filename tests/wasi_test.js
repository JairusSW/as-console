const fs = require('fs')

const loader = require('@assemblyscript/loader')

const { WASI } = require('wasi')

const wasi = new WASI()

const imports = {
    wasi_snapshot_preview1: wasi.wasiImport
}

const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + '/output/wasi.wasm'), imports)

wasi.start(wasmModule)

wasmModule.exports.test()
