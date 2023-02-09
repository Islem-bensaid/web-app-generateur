import {Component, Input, OnInit} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {AbstractControl, UntypedFormControl} from '@angular/forms';
import {hasrequiredField} from '../../tools';


@Component({
    selector: 'st2i-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {
    @Input() appearance: MatFormFieldAppearance = 'outline';
    @Input() type = 'text';
    @Input() control: UntypedFormControl | AbstractControl | null;
    @Input() label = '';
    @Input() value = '';
    @Input() disabled = false;
    required = hasrequiredField;
    @Input() number = false;
    @Input() d = false;
    @Input() rows: number = 2;
    @Input() hasTooltip: boolean = false;
    @Input() maxlength?: any;
    @Input() insideEditableTable: boolean = false;
    @Input() readonly: boolean = false;
    @Input() hideRequiredMarker: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }
}
