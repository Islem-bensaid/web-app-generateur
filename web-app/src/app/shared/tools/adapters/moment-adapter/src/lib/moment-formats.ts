/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgxMatDateFormats} from '@angular-material-components/datetime-picker';
import * as moment from 'moment';

const DEFAULT_DATE_INPUT = 'l, LTS';

export const NGX_MAT_MOMENT_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: ['YYYY-MM-DD HH:mm:ss.S', 'l', 'LL', moment.ISO_8601],
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        // dateInput: 'YYYY/MM/DD HH:mm:ss.S',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};
