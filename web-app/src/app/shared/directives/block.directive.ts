import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[st2iBlock]',
})
export class BlockDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.width = '100%';
    }
}
