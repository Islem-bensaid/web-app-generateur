import * as moment from 'moment';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

export const SPRING_FORMAT = 'YYYY-MM-DD HH:mm:ss.S';
export const dateInput = 'DD MMM YYYY';
export const dateFormats = [SPRING_FORMAT, moment.ISO_8601];

export function isValidDate(value: any): boolean {
    return moment(value, dateFormats, true).isValid();
}

export function isValidDate2(value: any): boolean {
    if (isNotNullOrUndefined(value)) {
        if (value.toString().includes(':') && !value.toString().includes('(')) {
            return moment(value, dateFormats, false).isValid();
        }
    }
}
