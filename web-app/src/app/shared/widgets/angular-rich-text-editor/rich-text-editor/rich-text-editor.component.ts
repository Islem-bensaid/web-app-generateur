import {Component, Input, OnInit} from '@angular/core';
import {richTextEditorConfig} from '../editorConfig';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {hasrequiredField} from '@shared/tools';

@Component({
    selector: 'st2i-rich-text-editor',
    templateUrl: './rich-text-editor.component.html',
    styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements OnInit {

    @Input() control: UntypedFormControl;
    @Input() label = '';
    @Input() id = '';
    @Input() appearance: MatFormFieldAppearance = 'outline';


    form: UntypedFormGroup;
    required = hasrequiredField;
    richTextEditorConfig = richTextEditorConfig;

    constructor(
        private formBuilder: UntypedFormBuilder
    ) {
    }

    ngOnInit(): void {
        this.form = this._initForm();
    }

    private _initForm() {
        const tForm = this.formBuilder.group({});
        tForm.addControl(this.id, this.control);
        return tForm;
    }

    errors(control: UntypedFormControl) {
        return Object.keys(control.errors || {});
    }

    onChange($event: any) {
        this.control.setValue(this.form.value[this.id]);
    }
}
