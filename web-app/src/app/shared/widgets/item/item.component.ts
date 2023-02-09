import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'st2i-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
    @Input() label?: string;
    @Input() value?: string | number;

    constructor() {
    }

    ngOnInit(): void {
    }
}
