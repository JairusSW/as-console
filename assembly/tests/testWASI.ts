import { console } from "../wasi";

export function test(): void {
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
}