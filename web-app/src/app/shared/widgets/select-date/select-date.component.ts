import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import { hasrequiredField, isSomeInputsChanged } from '../../tools';

@Component({
    selector: 'st2i-select-date',
    templateUrl: './select-date.component.html',
    styleUrls: ['./select-date.component.css'],
})
export class SelectDateComponent implements OnInit, OnChanges {
    @Input() min?: any;
    @Input() max?: any;
    @Input() control: UntypedFormControl;
    @Input() label: string;
    @Input() hideRequiredMarker = false;
    @Input() hasTooltip = false;
    required = hasrequiredField;

    @Output() onChangeEvent  = new EventEmitter<any>();


    constructor() {
    }

    ngOnInit(): void {
    }

    clear(mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
        this.control.setValue(undefined);
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (isSomeInputsChanged(changes, ['min', 'max'])) {
      if (changes.min?.currentValue !== changes.min?.previousValue) {
        this.min = new Date(changes.min.currentValue);
      }
      if (changes.max?.currentValue !== changes.max?.previousValue) {
        this.max = new Date(changes.max.currentValue);
      }
    }
  }
}
/**

  ngOnChanges(changes: SimpleChanges): void {
    if (isSomeInputsChanged(changes, ["min", "max"])) {
      if (changes.min?.currentValue !== changes.min?.previousValue) {
        if (changes.min?.currentValue) {
          console.log("ss");
          const currentMinDate = new Date(changes.min.currentValue);
          this.min = new Date(
            Date.UTC(
              currentMinDate.getUTCFullYear(),
              currentMinDate.getUTCMonth(),
              currentMinDate?.getUTCDay(),
              currentMinDate?.getHours(),
              currentMinDate?.getMinutes(),
              currentMinDate?.getSeconds()
            )
          );
        }
      }
      if (changes.max?.currentValue !== changes.max?.previousValue) {
        const currentMaxDate = changes.max.currentValue;
        this.max = new Date(
          Date.UTC(
            currentMaxDate?.getFullYear(),
            currentMaxDate?.getMonth() - 1,
            currentMaxDate?.getDate(),
            currentMaxDate?.getHours(),
            currentMaxDate?.getMinutes(),
            currentMaxDate?.getSeconds()
          )
        );
      }
    }
  }
}

 */
