import {ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

export function DateValidator(): ValidatorFn {
    return (control) => {
        return moment.isDate(control.value) ? null : {invalid: 'invalid'};
    };
}
