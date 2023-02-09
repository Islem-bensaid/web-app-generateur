export class Sort {
    nameCol: string;
    direction: string;

    constructor(nameCol: string = null, direction: string = null) {
        this.nameCol = nameCol;
        this.direction = direction;
    }
}
