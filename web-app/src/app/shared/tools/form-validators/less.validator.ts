import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isEmptyValue} from '../utils/indefinite-function';

export function lessValidator(
    control: AbstractControl,
    isautretax?: boolean
): ValidatorFn {
    return (current) => {
        const {value: controlValue} = control;
        const {value: currentValue} = current;

        if (isEmptyValue(controlValue) || isEmptyValue(currentValue)) {
            return null;
        }

        const big = Number(currentValue);
        const small = Number(controlValue);

        return currentValue <= controlValue
            ? null
            : !isautretax
                ? {maxmontant1: 'maxmontant1'}
                : {maxmontant2: 'mmaxmontant2'};
    };
}
