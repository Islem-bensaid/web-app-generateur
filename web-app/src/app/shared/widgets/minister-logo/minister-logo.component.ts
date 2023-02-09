import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'st2i-minister-logo',
    templateUrl: './minister-logo.component.html',
    styleUrls: ['./minister-logo.component.css'],
})
export class MinisterLogoComponent implements OnInit {
    constructor() {
    }

    @Input()
    width = 180;
    @Input()
    height = 180;

    get src() {
        return ['assets', 'logo_minister_education.png'].join('/');
    }

    ngOnInit(): void {
    }
}
