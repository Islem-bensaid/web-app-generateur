import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';

const error = {year_error: 'year_error'};

export function YearNumm(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const yearnum = regex.yearnum().test(input);

        return yearnum ? null : error;
    };
}
