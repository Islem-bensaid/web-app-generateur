import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'st2i-filter-actions',
    templateUrl: './filter-actions.component.html',
    styleUrls: ['./filter-actions.component.css'],
})
export class FilterActionsComponent implements OnInit {
    @Input() hasShowMorebtn: boolean = false;
    @Output() onSearchClicked = new EventEmitter<any>();
    @Output() onResetClicked = new EventEmitter<any>();
    @Output() onShowMoreClicked = new EventEmitter<any>();
    showMore = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleShowMoreFlag() {
        this.showMore = !this.showMore;
        this.onShowMoreClicked.emit(this.showMore);
    }

    reset() {

    }
}
