import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "input[numbersphoneOnly]",
})
export class NumberDirective {
  constructor(private _el: ElementRef) {}
  @Input() numbersphoneOnly;
  @HostListener("input", ["$event"]) onInputChange(event) {
    if (this.numbersphoneOnly) {
      const initalValue = this._el.nativeElement.value;
      this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, "");
      if (initalValue !== this._el.nativeElement.value) {
        event.stopPropagation();
      }
    }
  }
}
