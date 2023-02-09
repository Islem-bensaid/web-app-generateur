export function isEmptyValue(val: any): boolean {
    return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}

export function serializeValue(val: any): boolean {
    return isEmptyValue(val) ? null : val;
}

export function serializeBase64(b64: string, consumes: string): string {
    return `data:${b64.includes("base64")?'': consumes};base64,${b64}`
}

