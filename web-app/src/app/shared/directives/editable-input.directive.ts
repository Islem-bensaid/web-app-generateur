import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[st2iEditableInput]',
})
export class EditableInputDirective {
    @Input('appEditableInput') isEditMode: boolean;

    constructor(private el: ElementRef) {
        // console.log(this.isEditMode);
    }
}
