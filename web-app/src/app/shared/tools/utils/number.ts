export function isNumber(value: any) {
    return !isNaN(parseFloat(value));
}

export function minThreshold(value: number, min: number) {
    return Math.min(value, min);
}

export function maxThreshold(value: number, max: number) {
    return Math.max(value, max);
}
