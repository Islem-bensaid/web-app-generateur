import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {hasrequiredField} from '../../../../tools/utils/Hasrequired';

@Component({
    selector: 'st2i-select-boolean',
    templateUrl: './select-boolean.component.html',
    styleUrls: ['./select-boolean.component.css'],
})
export class SelectBooleanComponent implements OnInit {
    @Input() control: UntypedFormControl;
    @Input() label: string;
    @Input() reciproque = false;
    required = hasrequiredField;
    @Input() isstring = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    clear(event: MouseEvent) {
        event.stopPropagation();
        this.control.setValue(null);
    }
}
