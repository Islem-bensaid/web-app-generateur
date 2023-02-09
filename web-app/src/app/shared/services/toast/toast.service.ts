import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from "@environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private duration = environment.ToastDuration;

    constructor(
        private translate: TranslateService,
        private snackbar: MatSnackBar
    ) {
    }

    success(translationKey: string = 'general.success_save', params = {}) {
        this.show(translationKey, params);
    }

    error(translationKey: string = 'general.errors.server_error', params = {}) {
        return this.showError(translationKey, params);
    }

    private show(translationKey: string, params = {}) {
        this.translate.get(translationKey, params).subscribe((message) => {
            this.snackbar.open(message, undefined, {
                duration: this.duration,
                panelClass: ['green-snackbar'],
            });
        });
    }

    private showError(translationKey: string, params = {}) {
        this.translate.get(translationKey, params).subscribe((message) => {
            this.snackbar.open(message, undefined, {
                duration: this.duration,
                panelClass: ['red-snackbar'],
            });
        });
    }
}
