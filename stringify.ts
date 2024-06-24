import { rainbow } from "as-rainbow"

export function stringify<T>(data: T, deep: boolean = false): string {

    // String
    if (isString(data)) {
        return deep ? rainbow.green("'" + data as string + "'") : data as string;
    }
    // Number/NaN/Infinity
    else if (isFloat(data) || isInteger(data)) {
        return rainbow.yellow(`${data}`)
    }
    // Boolean
    else if (isBoolean(data)) {
        return data ? rainbow.yellow(`true`) : rainbow.yellow(`false`)
    }
    // Map
    else if (data instanceof Map) {
        if (data.size === 0) return "Map (0) {}"
        let res = "Map("

        const keys = data.keys()
        const values = data.values()

        res += `${keys.length + 1}) { `

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i]
            const value = values[i]
            res += `${stringify(key, true)} => ${stringify(value, true)}, `
        }

        res += `${stringify(keys[keys.length - 1], true)} => ${stringify(values[values.length - 1], true)} }`
    }
    // Set
    else if (data instanceof Set) {
        if (data.size === 0) return "Set (0) {}"
        let res = "Set("

        const values = data.values();

        res += `${values.length + 1}) { `

        for (let i = 0; i < values.length - 1; i++) {
            const value = values[i];
            res += `${stringify(value, true)}, `
        }

        res += `${stringify(values[values.length - 1], true)} }`
    }
    // Array/StaticArray/UintArray/IntArray/ArrayLike
    else if (isArray(data)) {
        if (data.length === 0) return "[]"
        let res = "["
        const lastChunk = data[data.length - 1]
        for (let i = 0; i < data.length - 1; i++) {
            const chunk = data[i]
            res += `${stringify(chunk, true)}, `
        }
        res += `${stringify(lastChunk, true)}]`
        return res
    }
    return "null";
}