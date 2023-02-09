import {AbstractControl, ValidatorFn} from '@angular/forms';

export function LessOrEqualValidator(control: AbstractControl): ValidatorFn {
    return (current) => {
        const small = Number(current.value);
        const big = Number(control.value);

        return small <= big ? null : {invalid: 'invalid'};
    };
}
