import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';

const error = {invalid: 'invalid'};

export function SchoolYearValidator(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const isArbicInput = regex.schoolyear().test(input);

        return isArbicInput ? null : error;
    };
}
