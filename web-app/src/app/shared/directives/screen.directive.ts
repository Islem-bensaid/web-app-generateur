import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[st2iScreen]",
})
export class ScreenDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.padding = undefined;
  }
}
