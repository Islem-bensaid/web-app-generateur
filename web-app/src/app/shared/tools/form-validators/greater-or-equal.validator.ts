import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isEmptyValue} from '../utils/indefinite-function';

export function GreaterOrEqualValidator(control: AbstractControl): ValidatorFn {
    return (current) => {
        const {value: controlValue} = control;
        const {value: currentValue} = current;

        if (isEmptyValue(controlValue) || isEmptyValue(currentValue)) {
            return null;
        }

        const big = Number(currentValue);
        const small = Number(controlValue);

        return big >= small ? null : {invalid: 'invalid'};
    };
}
