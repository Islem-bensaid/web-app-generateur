import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {isEmptyValue, isSomeInputsChanged} from "@shared/tools";

class CardMetadata {
    title: string;
    forDatatable: boolean;
    classList: {
        card: string;
        cardContent: string;
    }

    constructor() {
        this.forDatatable = false;
    }
}

@Component({
    selector: 'st2i-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnChanges {
    @Input() metadata: any;
    @Output() onAddClicked = new EventEmitter<any>();
    @Output() onUploadClicked = new EventEmitter<any>();
    @Output() onFilterKeyUp = new EventEmitter<any>();
    @Output() onGenerateFile = new EventEmitter<any>();
    params: object = {};

    constructor(
        private formBuilder: UntypedFormBuilder,
        private breakpointObserver: BreakpointObserver
    ) {
    }

    ngOnInit(): void {
        this.loadMetadata(this.metadata);
        this.initParams();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (isSomeInputsChanged(changes, ['metadata'])) {
            if (changes.metadata) {
                if (changes.metadata.currentValue !== changes.metadata.previousValue) {
                    this.loadMetadata(changes.metadata.currentValue);
                }
            }
        }
    }

    initParams() {
        if (this.metadata.forDatatable) {
            this.params['formRapidSearch'] = <UntypedFormGroup>this.formBuilder.group({
                typedValue: this.formBuilder.control(''),
            });
            this.breakpointObserver
                .observe(['(max-width: 599px)'])
                .subscribe((result) => {
                    this.params['isSmallScreen'] = result.matches;
                });
        }
    }

    loadMetadata(metadata) {
        this.metadata = {
            title: metadata?.title || '',
            forDatatable: isEmptyValue(metadata?.forDatatable) ? false : metadata?.forDatatable,
            classList: {
                card: metadata?.classList?.card || 'mb-3',
                cardContent: metadata?.classList?.cardContent || 'py-3 px-4 overflow-hidden'
            },
            hasAdd: isEmptyValue(metadata?.hasAdd) || metadata?.hasAdd,
            hasUpload: isEmptyValue(metadata?.hasUpload)? false: metadata?.hasUpload,
            hasExport: isEmptyValue(metadata?.hasExport)  || metadata?.hasExport,
            hasFilter: isEmptyValue(metadata?.hasFilter) || metadata?.hasFilter
        };
    }

    clear() {
        (<UntypedFormControl>this.params['formRapidSearch'].get('typedValue')).setValue(null);
        this.onFilterKeyUp.emit(null);
    }
}
