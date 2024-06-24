/* So Far, supports:
- Strings
- Numbers
- UintArrays
- IntArrays
- ArrayBuffer
- Map
- Set
- Array
- StaticArray
- Infinity
Add more to the list if you think of any!
*/
import { rainbow } from "as-rainbow";
import { createTable } from "table-as";
import { stringify } from "../stringify";

const counts = new Map<string, u32>()

const timers = new Map<string, u64>()

let indent = "";

export function assert<T>(value: T, message: string | null): void {
    if (!value) {
        if (isString(message)) {
            console.log(rainbow.red(`${indent}Assertion failed: ${changetype<string>(message)}`))
        } else {
            console.log(rainbow.red(`${indent}Assertion failed`))
        }
    }
}
export function count(label: string): void {
    if (!counts.has(label)) counts.set(label, 1)
    const count = counts.get(label)
    counts.set(label, count + 1)
    console.log(`${indent}${label}: ${rainbow.yellow((count + 1).toString())}`)
}
export function countReset(label: string): void {
    counts.set(label, 1)
}
export function debug<T>(message: T): void {
    console.log(`${indent}${stringify(message)}`)
}
export function error<T>(message: T): void {
    console.log(rainbow.red(`${indent}${stringify(message)}`))
}
export function group(label: string): void {
    console.log(`${indent}${label}`)
    indent += "  "
}
export function groupCollapsed(label: string): void {
    console.log(`${indent}${label}`)
    indent += "  "
}
export function groupEnd(): void {
    indent = indent.replace("  ", "")
}
export function info<T>(message: T): void {
    console.log(`${indent}${stringify(message)}`)
}
export function log<T>(message: T): void {
    console.log(`${indent}${stringify(message)}`)
}
export function time(label: string): void {
    if (timers.has(label)) {
        console.log(`${indent}Warning: Label "${label}" already exists for console.time()`);
        return
    }
    timers.set(label, Date.now());
}
export function timeEnd(label: string): void {
    if (!timers.has(label)) {
        console.log(`${indent}Warning: No such label "${label}" for console.timeEnd()`);
        return;
    }
    timeLogImpl(label);
    timers.delete(label);
}
export function timeLog(label: string): void {
    if (!timers.has(label)) {
        console.log(`${indent}Warning: No such label "${label}" for console.timeLog()`);
        return;
    }
    timeLogImpl(label);
}
export function trace<T>(message: T): void {
    console.log(`${indent}Trace: ${stringify(message)}`)
}
export function warn<T>(message: T): void {
    console.log(`${indent}${stringify(message)}`)
}

export function timeLogImpl(label: string): void {
    console.log(`${indent}${label}: ${Date.now() - timers.get(label)}ms`);
}

export function table(table: string[][]): void {
    let formatted: string[][] = [];
    let header: string[] = [];
    header.push("(index)");
    for (let i = 0; i < table[0].length; i++) header.push(i.toString());
    formatted.push(header);

    for (let row_index = 0; row_index < table.length; row_index++) {
        const row = unchecked(table[row_index]);
        const frow: string[] = [row_index.toString()]
        for (let column_index = 0; column_index < row.length; column_index++) {
            const column = unchecked(row[column_index]);
            frow.push(stringify(column, true));
        }
        formatted.push(frow);
    }

    console.log(createTable(formatted, 1));
}