import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractControl, UntypedFormControl} from '@angular/forms';
import {MatSelectFilterComponent} from 'mat-select-filter';
import {MatSelect} from '@angular/material/select';
import {hasrequiredField, isEmptyValue, isSomeInputsChanged} from '@shared/tools';
import {AppTranslateService} from '@shared/services';
import {SelectMetadata} from '@shared/models/SelectMetadata';

@Component({
    selector: 'st2i-select',
    templateUrl: './select-common.component.html',
    styleUrls: ['./select-common.component.css']
})
export class SelectCommonComponent implements OnInit, OnChanges {
    isEmptyValue = isEmptyValue;

    @ViewChild(MatSelectFilterComponent) filter: MatSelectFilterComponent;
    @ViewChild('MatSelect') select: MatSelect;
    @Output() onValueChangeEvent = new EventEmitter<any>();


    @Input() control: UntypedFormControl;
    @Input() listItems: any[];
    @Input() metadata: SelectMetadata = <SelectMetadata>{
        label: '',
        reset: false,
        hideRequiredMarker: false,
        filter: false,
        tooltip: false,
        muliple: false,
        disabled: false,
        grouping: false,
        optionLabel: '',
        value: '',
        emitedValue: ''
    };

    required = hasrequiredField;
    listsearch: any[];

    constructor(
        public appTranslateService: AppTranslateService
    ) {
    }


    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (isSomeInputsChanged(changes, ['listItems', 'control'])) {
            if (changes.listItems?.currentValue !== changes.listItems?.previousValue) {
                this.loadDataSource(changes.listItems.currentValue);
            }
            if (changes.control?.currentValue !== changes.control?.previousValue) {
                this.control = changes.control.currentValue;
                if (this.control) {
                    // this.setValue(this.control);
                }
            }
        }
    }

    clear($event: MouseEvent) {
        $event.stopPropagation();
        this.control.setValue(null);
        this.onValueChangeEvent.emit(null);
    }

    getOptionLabel(c: any) {
        console.assert(!!this.metadata.optionLabel, `Error in SelectCommonComponent/getOptionLabel, erreur: Votre métadata manque le 'optionLabel'`);
        if (typeof this.metadata?.optionLabel == 'string') {
            return c[this.metadata.optionLabel];
        } else {
            return c[this.metadata.optionLabel[this.appTranslateService.getDefaultLang()]];
        }
    }

    private loadDataSource(listItems) {
        if (listItems) {
            this.listItems = listItems;
            this.listsearch = [...listItems];
            this.listsearch?.map(
                (item) => (item.motcle = ((e) => {
                    if (typeof this.metadata?.optionLabel == 'string') {
                        return e[this.metadata.optionLabel];
                    } else {
                        return ((e) => {
                            let mot = '';
                            for (const val of Object.values(this.metadata.optionLabel)) {
                                mot += e[<string>val];
                            }
                            return mot;
                        })(e)
                    }
                })(item))
            );
        }
    }

    getValue(item) {
        return this.metadata.value ? item[((value) => {
            if (typeof value == 'object') {
                return value[this.appTranslateService.getDefaultLang()]
            } else {
                return value;
            }
        })(this.metadata.value)] : item;
    }

    change(e) {
        this.filter?.searchForm.reset();
    }

    changeValue(value) {
        if (value) {
            if (this.metadata.emitedValue === '—') {
                if (this.metadata.value) {
                    this.onValueChangeEvent.emit(this.listItems.filter(item => item[((value) => {
                        if (typeof value == 'object') {
                            return value[this.appTranslateService.getDefaultLang()]
                        } else {
                            return value;
                        }
                    })(this.metadata.value)] == value)[0]);
                } else {
                    this.onValueChangeEvent.emit(value);
                }
            } else {

                if (this.metadata.value) {
                    if (this.metadata.emitedValue == this.metadata.value) {
                        this.onValueChangeEvent.emit(value);
                    } else {
                        this.onValueChangeEvent.emit(this.listItems.filter(item => item[((value) => {
                            if (typeof value == 'object') {
                                return value[this.appTranslateService.getDefaultLang()]
                            } else {
                                return value;
                            }
                        })(this.metadata.value)] == value)[0][this.metadata.emitedValue]);
                    }
                } else {
                    this.onValueChangeEvent.emit(value[((emitedValue) => {
                        if (typeof emitedValue == 'object') {
                            return emitedValue[this.appTranslateService.getDefaultLang()]
                        } else {
                            return emitedValue;
                        }
                    })(this.metadata.emitedValue)]);
                }
            }
        } else {
            console.log('null value');
        }
    }
}
