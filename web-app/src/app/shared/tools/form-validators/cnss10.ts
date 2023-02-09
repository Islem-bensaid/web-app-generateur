import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';
import {isEmptyValue} from '../utils/indefinite-function';

const error = {cnss_error: 'cnss_error'};

export function CnssValidtors(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const cnss_error = regex.cnss().test(input);
        if (isEmptyValue(input)) {
            return null;
        }
        return cnss_error ? null : error;
    };
}
