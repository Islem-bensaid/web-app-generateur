import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {hasrequiredField, isSomeInputsChanged} from '../../tools';

@Component({
    selector: 'st2i-text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TextFieldComponent implements OnInit, OnChanges {
    listFilteredOptions = [];
    required = hasrequiredField;

    @ViewChild('select') select: any;

    @Input() appearance: MatFormFieldAppearance = 'outline';
    @Input() type = 'text';
    @Input() control: UntypedFormControl;
    @Input() placeholder = '';
    @Input() label = '';
    @Input() value = '';
    @Input() min?: any;
    @Input() max?: any;
    @Input() number = false;
    @Input() enableOnlyArabic = false;
    @Input() d = false;
    @Input() isIconPrefix = false;
    @Input() prefix: string;
    @Input() isSuffixClicked = false;
    @Input() isIconSuffix = false;
    @Input() suffix: string;
    @Input() suffixStyleList: string = '';
    @Input() lettre = false;
    @Input() isMontant = false;
    @Input() numberphone = false;
    @Input() hideRequiredMarker = false;
    @Input() isWithAutocomplete = false;
    @Input() listData = [];
    @Input() isDisabled = false;
    @Input() itemToFilterWith: string = '';
    @Input() hasTooltip: boolean = false;
    @Input() isDatatableHeaderSearchField: boolean = false;
    @Input() matFormFieldStyle: string = '';
    @Input() isListAutocompleteLoading = false;

    @Input() typedValue: string = '';
    @Input() read = false;
    @Input() formated = false;
    @Input() isListLoadisg = false;
    @Input() isGet = false;
    @Input() msgEmptyList: string = 'Désolé, n\'existe pas dans la liste';


    @Output() keyUpEvent = new EventEmitter<any>();
    @Output() onChangeEvent = new EventEmitter<any>();
    @Output() emitSelectedValueEvent = new EventEmitter<any>();
    @Output() suffixClickedEvent = new EventEmitter<any>();

    constructor() {
    }
    ngOnInit(): void {
        if (this.isWithAutocomplete && this.control.value) {
            this.typedValue = this.control.value;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const {listData} = changes;
        if (listData) {
            if (listData.currentValue !== listData.previousValue) {
                this.loadDataSource(listData.currentValue);
            }
        }

    }

    loadDataSource(listData) {
        this.listData = listData;
        this.filterListData();
    }

    emitTypedValue(event: any) {
        this.keyUpEvent.emit(event.target.value);
    }

    filterListData() {
        if (!this.typedValue) {
            this.listFilteredOptions = [...this.listData];
        } else {
            this.listFilteredOptions = this.listData.filter((option) => {
                if (
                    option[this.itemToFilterWith]
                        .toLowerCase()
                        .includes(this.typedValue.toString().toLowerCase())
                ) {
                    return option;
                }
            });
        }
    }

    format(data) {

    }

    onOptionSelected(event) {
        if (this.isGet) {
            this.typedValue = '';
            this.control.setValue(null);
            this.emitSelectedValueEvent.emit(event.option.value);
        } else {
            this.typedValue = event.option.value[this.itemToFilterWith];
            this.emitSelectedValueEvent.emit(event.option.value);
        }
    }

    onChange(event) {
        this.onChangeEvent.emit(event.target.value);
    }
}
