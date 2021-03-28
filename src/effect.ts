import { TrackOpTypes, TriggerOpTypes } from "./operations";

export interface ReactiveEffectOptions {

}

export interface ReactiveEffect<T = any> {
    (): T
    _isEffect: true
    raw: () => T
}


// 监测数据变更的响应函数 
function effect<T = any>(
    fn: () => T,
    options: ReactiveEffectOptions = {}
): ReactiveEffect<T> {

    if (isEffect(fn)) {
        fn = (fn as ReactiveEffect).raw;
    }
    const effect = createReactiveEffect(fn, options);

    return effect;
}

function createReactiveEffect<T = any>(
    fn: () => T,
    options: ReactiveEffectOptions
): ReactiveEffect {
    const effect: ReactiveEffect = function reactiveEffect() {

    }
    effect._isEffect = true;
    effect.raw = fn;
    return effect;
}

export function isEffect(fn: any): boolean {
    return fn && fn._isEffect === true
}


export { effect }