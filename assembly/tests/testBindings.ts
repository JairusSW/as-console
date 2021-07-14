import { console } from "../index";

console.log('Outside...')
function test(): void {
    console.log('Inside...')
}

test()