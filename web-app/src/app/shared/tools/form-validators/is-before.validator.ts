import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {isEmptyValue} from '../utils/indefinite-function';

export function BeforeDateValidator(date: AbstractControl): ValidatorFn {
    return (control) => {
        if (isEmptyValue(control)) {
            return null;
        }
        const isBefore = moment(control.value).isBefore(moment(date.value));
        return isBefore ? null : {invalid: 'invalid'};
    };
}
