import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';

const error = {majuscule: 'majuscule'};

export function Majuscule(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const MAJ = regex.Maj().test(input);

        return MAJ ? null : error;
    };
}
