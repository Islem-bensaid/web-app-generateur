import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {isEmptyValue} from '../utils/indefinite-function';

export function AfterDateValidator(date: AbstractControl): ValidatorFn {
    return (control) => {
        if (isEmptyValue(control)) {
            return null;
        }

        const isAfter = moment(control.value, 'YYYY-MM-DD').isSameOrAfter(
            moment(date.value, 'YYYY-MM-DD')
        );
        return isAfter ? null : {invalid: 'invalid'};
    };
}
