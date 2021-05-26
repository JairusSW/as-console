// @ts-ignore
import { StringSink } from 'as-string-sink'

// Pre-alloc in memory. (faster)
const nullVal = `null`

// Kati implmentation and mod
export function stringify<T>(data: T): string {
    let result = new StringSink()

    // -- String
    if (isString(data)) {
        result.write(`${data}`)
    }
    // -- Number/NaN/Infinity
    else if (isFloat(data) || isSigned(data) || isInteger(data)) {
        result.write(`${data}`)
    }
    // -- Boolean
    else if (isBoolean(data)) {
        result.write(data ? `true` : `false`)
    }
    // Map
    else if (data instanceof Map) {

        result.write('Map(')

        const keys = data.keys()
        const values = data.values()
        const lastKey = keys.pop()
        const lastValue = values.pop()

        result.write(`${keys.length + 1}) { `)

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = values[i]
            result.write(`'${stringify(key)}' => '${stringify(value)}', `)
        }

        result.write(`'${stringify(lastKey)}' => '${stringify(lastValue)}' }`)
    }
    // Array/StaticArray/UintArray/IntArray/ArrayLike
    else if (isArrayLike(data)) {
        result.write('[')
        // Just loop through all the chunks and stringify them.
        const lastChunk = data[data.length - 1]
        for (let i = 0; i < data.length - 1; i++) {
            const chunk = data[i]
            if (isString(chunk)) {
                result.write(`'${stringify(chunk)}', `)
            } else {
                result.write(`${stringify(chunk)}, `)
            }
        }
        if (isString(lastChunk)) {
            result.write(`'${stringify(lastChunk)}']`)
        } else {
            result.write(`${stringify(lastChunk)}]`)
        }
    } else {
        result.write(nullVal)
    }
    return result.toString()
}
// @ts-ignore: Decorator
@external('consoleBindings', '_log')
declare function _log(data: string): void

/* So Far, supports:
- Strings
- Numbers
- UintArrays
- IntArrays
- ArrayBuffer
- Map
- Array
- StaticArray
- Infinity
Add more to the list if you think of any!
*/

export namespace console {
    export function log<T>(data: T): void {
        _log(stringify(data))
    }
}