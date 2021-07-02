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
                process.stdout.write(`${indent}Assertion failed: ${changetype<string>(message).toString()}\n`)
            } else {
                process.stdout.write(`${indent}Assertion failed\n`)
            }
        }
    }
    export function count(label: string): void {
        if (!counts.has(label)) counts.set(label, 1)
        const count = counts.get(label)
        counts.set(label, count + 1)
        process.stdout.write(`${indent}${label}: ${count + 1}\n`)
    }
    export function countReset(label: string): void {
        counts.set(label, 1)
    }
    export function debug<T>(message: T): void {
        process.stdout.write(`${indent}${stringify(message)}\n`)
    }
    export function error<T>(message: T): void {
        process.stdout.write(`${indent}${stringify(message)}\n`)
    }
    export function group(label: string): void {
        process.stdout.write(`${indent}${label}\n`)
        indent += '  '
    }
    export function groupCollapsed(label: string): void {
        process.stdout.write(`${indent}${label}\n`)
        indent += '  '
    }
    export function groupEnd(): void {
        indent = indent.replace('  ', '')
    }
    export function info<T>(message: T): void {
        process.stdout.write(`${indent}${stringify(message)}\n`)
    }
    export function log<T>(message: T): void {
        process.stdout.write(`${indent}${stringify(message)}\n`)
    }
    export function time(label: string): void {
        if (timers.has(label)) {
            process.stdout.write(`${indent}Warning: Label '${label}' already exists for console.time()\n`);
            return
        }
        timers.set(label, process.hrtime());
    }
    export function timeEnd(label: string): void {
        if (!timers.has(label)) {
            process.stdout.write(`${indent}Warning: No such label '${label}' for console.timeEnd()\n`);
            return;
        }
        timeLogImpl(label);
        timers.delete(label);
    }
    export function timeLog(label: string): void {
        if (!timers.has(label)) {
            process.stdout.write(`${indent}Warning: No such label '${label}' for console.timeLog()\n`);
            return;
        }
        timeLogImpl(label);
    }
    export function trace<T>(message: T): void {
        process.stdout.write(`${indent}Trace: ${stringify(message)}\n`)
    }
    export function warn<T>(message: T): void {
        process.stdout.write(`${indent}${stringify(message)}\n`)
    }
}

function timeLogImpl(label: string): void {
    let start = timers.get(label);
    let end = process.hrtime();
    let nanos = end - start;
    let millis = nanos / 1000000;
    process.stdout.write(`${indent}${label}: ${millis} ms\n`);
    
}