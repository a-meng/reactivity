// using literal strings instead of numbers so that it's easier to inspect
// debugger events
// 配置信息集中统一存放，页面使用也更有语义,更清晰
export const enum TrackOpTypes {
    GET = 'get',
    HAS = 'has',
    ITERATE = 'iterate'
}

export const enum TriggerOpTypes {
    SET = 'set',
    ADD = 'add',
    DELETE = 'delete',
    CLEAR = 'clear'
}