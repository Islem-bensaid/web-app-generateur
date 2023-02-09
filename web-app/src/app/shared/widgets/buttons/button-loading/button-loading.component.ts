import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'st2i-button-loading',
    templateUrl: './button-loading.component.html',
    styleUrls: ['./button-loading.component.scss']
})
export class ButtonLoadingComponent implements OnInit {

    @Input('loading') loading: boolean;
    @Input('disabled') disabled: boolean;
    @Input('btnClass') btnClass: string;
    @Input('raised') raised = true;
    @Input('loadingText') loadingText = 'general.errors.waiting';
    @Input('type') type: 'button' | 'submit' = 'submit';
    @Input('color') color: 'primary' | 'accent' | 'warn' = 'primary';

    constructor() {
    }

    ngOnInit() {
    }

}
