import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';

const error = {special: 'special'};

export function SpecialCarc(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const special = regex.SpecialCarc().test(input);

        return special ? null : error;
    };
}
