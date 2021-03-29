import { TrackOpTypes, TriggerOpTypes } from "./operations";
type Dep = Set<ReactiveEffect>
export interface ReactiveEffectOptions {

}

export interface ReactiveEffect<T = any> {
    (): T
    _isEffect: true
    raw: () => T
    deps: Dep[]
}


// 创建响应函数
function effect<T = any>(
    fn: () => T,
    options: ReactiveEffectOptions = {}
): ReactiveEffect<T> {

    // 如果传入的已经是响应函数，则找到原始函数创建
    if (isEffect(fn)) {
        fn = (fn as ReactiveEffect).raw;
    }
    const effect = createReactiveEffect(fn, options);

    return effect;
}

const effectStack: ReactiveEffect[] = [];
let activeEffect: ReactiveEffect | undefined;
function createReactiveEffect<T = any>(
    fn: () => T,
    options: ReactiveEffectOptions
): ReactiveEffect {
    const effect: ReactiveEffect = function reactiveEffect() {
        if (!effectStack.includes(effect)) {
            cleanup(effect)
            try {
                //enableTracking()
                effectStack.push(effect)
                activeEffect = effect
                return fn()
            } finally {
                effectStack.pop()
                //resetTracking()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect._isEffect = true;
    effect.raw = fn;
    effect.deps = [];
    return effect;
}

export function isEffect(fn: any): boolean {
    return fn && fn._isEffect === true
}
function cleanup(effect: ReactiveEffect) {
    const { deps } = effect
    if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
            deps[i].delete(effect)
        }
        deps.length = 0
    }
}


export { effect }