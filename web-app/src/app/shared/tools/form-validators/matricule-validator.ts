import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';
import {isEmptyValue} from '../utils/indefinite-function';

const error = {mat_error: 'mat_error'};

export function MatriculeValidtors(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const iscin = regex.matricule().test(input);
        if (isEmptyValue(input)) {
            return null;
        }
        return iscin ? null : error;
    };
}
