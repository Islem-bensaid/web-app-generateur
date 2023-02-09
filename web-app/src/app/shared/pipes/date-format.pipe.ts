import {Pipe, PipeTransform} from '@angular/core';
import {DateFormatPipe as MomentDateFormatPipe} from 'ngx-moment';
import {isEmptyValue} from "@shared/tools";

@Pipe({name: 'df'})
export class DateFormatPipe implements PipeTransform {
    constructor() {
    }

    transform(value: any, ...args: any[]): any {
        if (isEmptyValue(value))
            return '-'
        if (window.localStorage.getItem('LANG') == 'ar') {
            return new MomentDateFormatPipe().transform(value, 'YYYY/MM/DD');
        } else {
            return new MomentDateFormatPipe().transform(value, 'DD/MM/YYYY');
        }
    }
}
