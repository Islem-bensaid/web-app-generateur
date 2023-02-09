import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {DateAdapter, ThemePalette} from '@angular/material/core';
import * as moment from 'moment';
// import {NgxMatDateAdapter} from '@angular-material-components/datetime-picker';
import {hasrequiredField} from 'src/app/shared/tools/utils/Hasrequired';
import { AppTranslateService, DatenowService } from '../../services';
import { DateFormatheurePipe } from '../../pipes';

@Component({
    selector: 'st2i-select-date-time',
    templateUrl: './select-date-time.component.html',
    styleUrls: ['./select-date-time.component.css'],
})
export class SelectDateTimeComponent implements OnInit, OnChanges {

    public date: moment.Moment;
    @Input() public disabled = false;
    @Input() public showSpinners = true;
    @Input() public showSeconds = false;
    @Input() public touchUi = false;
    @Input() public enableMeridian = false;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() label: string;
    @Input() errorMsg: string = 'Date invalide';
    @Input() currentDateValue: Date = new Date();
    @Input() hasTooltip: boolean = false;
    @Input() control: UntypedFormControl;

    public color: ThemePalette = 'primary';
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;

    required = hasrequiredField;


    constructor(
        private appTranslateService: AppTranslateService,
        private dateAdapter: DateAdapter<any>,
        // private ngxDateAdapter: NgxMatDateAdapter<any>,
        private cdRef: ChangeDetectorRef,
        private datenowService: DatenowService
    ) {
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        const {currentDateValue} = changes;
        if (currentDateValue?.currentValue != currentDateValue?.previousValue) {
        }
    }

    clear(mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
        this.control.setValue(undefined);
    }


    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    getFormattedDateValueForTheTooltip(dateVal) {
        return new DateFormatheurePipe().transform(dateVal);
    }

}
