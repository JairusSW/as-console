import { console } from "../index";

console.log('Outside')

export function test(): void {
    console.log('Inside')
}