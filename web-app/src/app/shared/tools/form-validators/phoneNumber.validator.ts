import {ValidatorFn} from '@angular/forms';
import {regex} from '../../constantes/regex';
import {isEmptyValue} from '../utils/indefinite-function';

const error = {'general.errors.phonenumber_err': 'general.errors.phonenumber_err'};

export function PhoneNumber(): ValidatorFn {
    return (control): null | typeof error => {
        const {value: input} = control;
        const haasnumber = regex.isphoneNumber().test(input);
        if (isEmptyValue(input)) {
            return null;
        }
        return haasnumber ? null : error;
    };
}
