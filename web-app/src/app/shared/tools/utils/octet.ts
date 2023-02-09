export function megaBytes(quantity: number) {
    return quantity * Math.pow(1024, 2);
}

export function octetsToMegaBytes(octets: number) {
    return octets / Math.pow(1024, 2);
}
