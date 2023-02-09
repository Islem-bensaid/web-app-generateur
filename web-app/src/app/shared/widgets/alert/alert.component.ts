import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'st2i-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
    @Input() show: any;
    @Input() withoutBorder = false;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
    }
}
