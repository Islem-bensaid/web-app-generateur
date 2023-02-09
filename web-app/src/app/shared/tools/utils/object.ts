export function isObject(variable: any) {
    return Object.prototype.toString.call(variable) === '[object Object]';
}

export function replaceEmptyValuesWithNull(object: any) {
    const keys = Object.keys(object);

    return keys.reduce((newObject, key) => {
        const value = object[key];
        const newValue = value === '' ? null : value;
        return Object.assign(newObject, {[key]: newValue});
    }, {});
}

export function removeUndefinedValues(object: any) {
    const keys = Object.keys(object);
    return {
        ...keys
            .filter((key) => typeof object[key] !== 'undefined')
            .map((key) => ({[key]: object[key]})),
    };
}
