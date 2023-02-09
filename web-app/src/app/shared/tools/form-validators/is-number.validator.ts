import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isNumber} from '../utils/number';
import {isEmptyValue} from '../utils/indefinite-function';

const isNotNumber = {is_not_a_number: 'is_not_a_number'};

export function NumberValidator(): ValidatorFn {
    return (control: AbstractControl): typeof isNotNumber | null => {
        const {value} = control;

        if (isEmptyValue(value)) {
            return null;
        }

        return isNumber(value) ? null : isNotNumber;
    };
}
