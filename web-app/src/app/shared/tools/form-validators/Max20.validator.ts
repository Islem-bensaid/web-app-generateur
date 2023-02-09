import {ValidatorFn} from '@angular/forms';
import {isNumber} from '../utils/number';
import {isEmptyValue} from '../utils/indefinite-function';

export function Max20Validator(): ValidatorFn {
    return (control) => {
        const {value} = control;

        if (isEmptyValue(value)) {
            return null;
        }
        /*if(isNotNullOrUndefined(control.parent.controls)){
                if(control.parent.controls['codeCritere'].value==18){

                  return (isNumber(value) && +value >= 0 && +value <= 20) ? null : {must_be_less_equal_20_moyenne: 'must_be_less_equal_20_moyenne'};
                }
            }
                else*/

        return isNumber(value) && +value >= 0 && +value <= 20
            ? null
            : {must_be_less_equal_20: 'must_be_less_equal_20'};
    };
}
