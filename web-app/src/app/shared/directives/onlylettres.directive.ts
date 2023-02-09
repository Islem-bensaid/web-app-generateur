import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[st2iOnlylettre]',
})
export class NumbersOnlyInputDirective {
    @Input() st2iOnlylettre = true;

    constructor(private elRef: ElementRef) {
    }

    regex = '^[a-zA-Z-\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F ]*$';
    private readonly regEx = new RegExp(
        '^[a-zA-Z-\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F ]*$'
    );

    @HostListener('keypress', ['$event'])
    onKeyress(event) {
        if (this.st2iOnlylettre) {
            return new RegExp(this.regex).test(event.key);
        }
    }

    @HostListener('paste', ['$event'])
    blockPaste(event: ClipboardEvent) {
        this.validate(event);
    }

    validate(event: ClipboardEvent) {
        if (this.st2iOnlylettre) {
            event.preventDefault();
        }
        const predta = event.clipboardData
            .getData('text/plain')
            .replace(/[^a-zA-Z-\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F ]/g, '');
        document.execCommand('insertHtml', false, predta);
    }

    @HostListener('paste', ['$event']) onPaste(e) {
        if (this.st2iOnlylettre) {
            const pastedText = e.clipboardData.getData('text/plain');
            if (pastedText) {
                if (!this.isValid(pastedText)) {
                    event.preventDefault();
                }
            }
        }
    }

    private isValid(elegible: string): boolean {
        const current: string = this.elRef.nativeElement.value;
        const next: string = current.concat(elegible);
        return this.regEx.test(elegible);
    }
}
