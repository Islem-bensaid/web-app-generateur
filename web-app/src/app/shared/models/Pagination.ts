export class Pagination {
    offSet: number;
    limit: number;

    constructor(offSet = null, limit = null) {
        this.offSet = offSet;
        this.limit = limit;
    }
}
