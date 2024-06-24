import * as console from "./index";

console.assert(false, 'assert')
console.count('count')
console.countReset('count')
console.debug('debug')
console.error('error')
console.group('group')
console.group('group')
console.group('group')
console.groupCollapsed('groupCollapsed')
console.groupCollapsed('groupCollapsed')
console.groupCollapsed('groupCollapsed')
console.groupEnd()
console.info('info')
console.log('log')
console.time('time')
console.timeLog('time')
console.timeEnd('time')
console.trace('trace')
console.warn('warn')

console.log("Hello from AssemblyScript!");
console.log([
    "It supports other types"
]);
console.log([["Other","than","strings"]])

console.table([
    ["0A","0B","0C"],
    ["1A","1B","1C"],
    ["2A","2B","2C"]
  ])