import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {Inject, Injectable, Optional} from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {
    constructor(
        @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
        super(dateLocale, {useUtc: true});
    }

    format(date: moment.Moment, displayFormat: string): string {
        if (window.localStorage.getItem('LANG') == 'ar') {
            return super.format(date, 'YYYY/MM/DD');
        } else {
            return super.format(date, 'DD/MM/YYYY');
        }
    }

    parse(value: any, parseFormat: string | string[]): moment.Moment | null {
        return super.parse(value, parseFormat);
    }
}






