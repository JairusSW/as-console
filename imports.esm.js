export class ConsoleImport {

	constructor() {

		this._exports = null

		this.wasmImports = {
			consoleBindings: {
				_log: (message) => {
					if (!this._exports) {
						process.nextTick(() => {
							this.wasmImports.consoleBindings._log(message)
						})
						return
					}
					console.log(this._exports.__getString(message))
				}
			}
		}
	}

	get wasmExports() {
		return this._exports
	}
	set wasmExports(e) {
		this._exports = e
	}

	getFn(fnIndex) {
		if (!this.wasmExports)
			throw new Error(
				'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
			)
		return this._exports.table.get(fnIndex)
	}
}