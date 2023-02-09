import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'st2i-empty-list-container',
    templateUrl: './empty-list-container.component.html',
    styleUrls: ['./empty-list-container.component.css'],
})
export class EmptyListContainerComponent implements OnInit {
    @Input() list: any[] | undefined | null;
    @Input() msg = 'general.empty_list_table';
    @Input() withoutBorder = false;

    constructor() {
    }

    get isArray() {
        return Array.isArray(this.list);
    }

    get isEmptyValue() {
        return this.isArray && !this.list.length;
    }

    get isNotEmpty() {
        return this.isArray && this.list.length;
    }

    ngOnInit(): void {
    }
}
