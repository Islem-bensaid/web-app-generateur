import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'st2i-recaptcha',
    templateUrl: './recaptcha.component.html',
    styleUrls: ['./recaptcha.component.css'],
})
export class RecaptchaComponent implements OnInit {
    @Output() resolve: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onResolve(token: string) {
        this.resolve.emit(token);
    }
}
