// multiple named exports

export const sqrt = Math.sqrt

export var pi = 3.141593

export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
