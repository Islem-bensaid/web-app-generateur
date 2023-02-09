import {Pipe, PipeTransform} from '@angular/core';
import {DateFormatPipe as MomentDateFormatPipe} from 'ngx-moment';

@Pipe({name: 'dhf'})
export class DateFormatheurePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (!value) {
            return '-';
        }
        // if (['fr' || 'en'].includes(localStorage.getItem('LANG'))) {
        if (['fr' || 'en'].includes(localStorage.getItem('LANG'))) {
            return new MomentDateFormatPipe().transform(value, 'DD/MM/YYYY HH:mm');
        } else {
            return new MomentDateFormatPipe().transform(value, 'YYYY/MM/DD HH:mm');
        }
    }
}
