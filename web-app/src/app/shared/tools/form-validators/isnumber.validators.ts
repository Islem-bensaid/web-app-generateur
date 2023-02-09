import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';

const error = {numberexist: 'numberexist'};

export function haveNumber(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const haasnumber = regex.isnumber().test(input);

        return haasnumber ? null : error;
    };
}
