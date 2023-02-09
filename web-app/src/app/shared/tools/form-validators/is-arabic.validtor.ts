import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';

const error = {invalid_arabicInput: 'invalid_arabicInput'};

export function ArbicInputValidator(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
            const isArbicInput = regex.arabicInput().test(input);

        return isArbicInput ? null : error;
    };
}
