import {Directive, ElementRef, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Directive({
    selector: '[st2iContainer]',
})
export class ContainerDirective {
    @Input() active: boolean;

    constructor(el: ElementRef, private route: ActivatedRoute) {
        el.nativeElement.style.padding = '1% 10%';
    }
}
