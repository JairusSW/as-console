// @ts-ignore: Decorator
@external('consoleBindings', '_log')
declare function _log(data: string): void

export function stringify<T>(data: T): string {

    // String
    if (isString(data)) {
        return `${data}`
    }
    // Number/NaN/Infinity
    else if (isFloat(data) || isInteger(data)) {
        return `${data}`
    }
    // Boolean
    else if (isBoolean(data)) {
        return data ? `true` : `false`
    }
    // Map
    else if (data instanceof Map) {
        if (data.size === 0) return 'Map (0) {}'
        let res = 'Map('

        const keys = data.keys()
        const values = data.values()

        res += `${keys.length + 1}) { `

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i]
            const value = values[i]
            res += `'${stringify(key)}' => '${stringify(value)}', `
        }

        res += `'${stringify(keys[keys.length - 1])}' => '${stringify(values[values.length - 1])}' }`
    }
    // Array/StaticArray/UintArray/IntArray/ArrayLike
    else if (isArray(data) || isArrayLike(data)) {
        if (data.length === 0) return '[]'
        let res = '['
        const lastChunk = data[data.length - 1]
        for (let i = 0; i < data.length - 1; i++) {
            const chunk = data[i]
            if (isString(chunk)) {
                res += `'${stringify(chunk)}', `
            } else {
                res += `${stringify(chunk)}, `
            }
        }
        if (isString(lastChunk)) {
            res += `'${stringify(lastChunk)}']`
        } else {
            res += `${stringify(lastChunk)}]`
        }
        return res
    }
    return 'null'
}

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

const counts = new Map<string, u32>()

const timers = new Map<string, u64>()

let indent = ''

export namespace console {
    export function assert<T>(value: T, message: string | null): void {
        if (!value) {
            if (isString(message)) {
                _log(`${indent}Assertion failed: ${changetype<string>(message)}`)
            } else {
                _log(`${indent}Assertion failed`)
            }
        }
    }
    export function count(label: string): void {
        if (!counts.has(label)) counts.set(label, 1)
        const count = counts.get(label)
        counts.set(label, count + 1)
        _log(`${indent}${label}: ${count + 1}`)
    }
    export function countReset(label: string): void {
        counts.set(label, 1)
    }
    export function debug<T>(message: T): void {
        _log(`${indent}${stringify(message)}`)
    }
    export function error<T>(message: T): void {
        _log(`${indent}${stringify(message)}`)
    }
    export function group(label: string): void {
        _log(`${indent}${label}`)
        indent += '  '
    }
    export function groupCollapsed(label: string): void {
        _log(`${indent}${label}`)
        indent += '  '
    }
    export function groupEnd(): void {
        indent = indent.replace('  ', '')
    }
    export function info<T>(message: T): void {
        _log(`${indent}${stringify(message)}`)
    }
    export function log<T>(message: T): void {
        _log(`${indent}${stringify(message)}`)
    }
    export function time(label: string): void {
        if (timers.has(label)) {
            _log(`${indent}Warning: Label '${label}' already exists for console.time()`);
            return
        }
        timers.set(label, Date.now());
    }
    export function timeEnd(label: string): void {
        if (!timers.has(label)) {
            _log(`${indent}Warning: No such label '${label}' for console.timeEnd()`);
            return;
        }
        timeLogImpl(label);
        timers.delete(label);
    }
    export function timeLog(label: string): void {
        if (!timers.has(label)) {
            _log(`${indent}Warning: No such label '${label}' for console.timeLog()`);
            return;
        }
        timeLogImpl(label);
    }
    export function trace<T>(message: T): void {
        _log(`${indent}Trace: ${stringify(message)}`)
    }
    export function warn<T>(message: T): void {
        _log(`${indent}${stringify(message)}`)
    }
}

function timeLogImpl(label: string): void {
    _log(`${indent}${label}: ${Date.now() - timers.get(label)}ms`);
}