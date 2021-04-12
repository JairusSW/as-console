class WakeImport {
    
    constructor() {
        
        this._exports = null

        this.wasmImports = {
            console: {
                consoleDebug: (message) => {

                    console.debug(this._exports.__getString(message))
        
                },
                consoleError: (message) => {
        
                    console.error(this._exports.__getString(message))
        
                },
                consoleInfo: (message) => {
        
                    console.info(this._exports.__getString(message))
        
                },
                consoleTime: (label) => {
        
                    console.time(this._exports.__getString(label))
        
                },
                consoleTimeEnd: (label) => {
        
                    console.timeEnd(this._exports.__getString(label))
        
                },
                consoleTimeLog: (label) => {
        
                    console.timeLog(this._exports.__getString(label))
        
                },
                consoleWarn: (message) => {
        
                    console.warn(this._exports.__getString(message))
        
                },
                consoleLog: (message) => {
        
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
        this._exports.__getString = e.__getString
        this._exports.__newString = e.__newString
        this._exports.__newArray = e.__newArray
        this._exports.__getArray = e.__getArray
	}

	getFn(fnIndex) {
		if (!this.wasmExports)
			throw new Error(
				'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
			)
		return this._exports.table.get(fnIndex)
	}
}

module.exports = WakeImport