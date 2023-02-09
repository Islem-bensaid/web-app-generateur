import {Component, Input, OnInit} from '@angular/core';
import {AppTranslateService} from '../../services/translate/app-translate.service';

@Component({
    selector: 'st2i-heading',
    templateUrl: './heading.component.html',
    styleUrls: ['./heading.component.css'],
})
export class HeadingComponent implements OnInit {
    @Input() icon: string;
    @Input() text: string;

    constructor(private translate: AppTranslateService) {
    }

    get dir() {
        return this.translate.getDir();
    }

    ngOnInit(): void {
    }
}
