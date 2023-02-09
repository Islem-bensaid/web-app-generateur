export function withParams(url: string, params: object) {
    const keys = Object.keys(params);

    if (!keys.length) {
        return url;
    }

    const _ = keys.map((param) => `${param}=${params[param]}`);

    return `${url}?${_.join('&')}`;
}
