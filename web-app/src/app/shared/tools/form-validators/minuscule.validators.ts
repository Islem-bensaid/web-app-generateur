import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';

const error = {minuscule: 'Minscule'};

export function Minuscule(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const minuscule = regex.minusucle().test(input);

        return minuscule ? null : error;
    };
}
