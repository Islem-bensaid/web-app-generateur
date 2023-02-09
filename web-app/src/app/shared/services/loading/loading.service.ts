import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '@shared/widgets/spinner/spinner.component';
import { isEmptyValue } from '@shared/tools';
import { SpinnerConfig } from '@shared/models/SpinnerConfig';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {

    static SPINNER_PROGRESS_CONFIG = new SpinnerConfig(true, 50, 'warn', 'determinate', 0, '0 %');

    spinnerRef: MatDialogRef<SpinnerComponent>;

    loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /**
     * Contains in-progress loading requests
     */
    loadingMap: Map<string, boolean> = new Map<string, boolean>();

    constructor(
      private dialog: MatDialog
    ) {
    }

    /**
     * Sets the loadingSub property value based on the following:
     * - If loading is true, add the provided url to the loadingMap with a true value, set loadingSub value to true
     * - If loading is false, remove the loadingMap entry and only when the map is empty will we set loadingSub to false
     * This pattern ensures if there are multiple requests awaiting completion, we don't set loading to false before
     * other requests have completed. At the moment, this function is only called from the @link{HttpRequestInterceptor}
     * @param loading {boolean}
     * @param url {string}
     * @param determinate {boolean}
     */
    setLoading(loading: boolean, url: string, determinate: boolean = false): void {
        if (!url) {
            throw new Error(
                'The request URL must be provided to the LoadingService.setLoading function'
            );
        }
        if (loading === true) {
            if (this.loadingMap.size === 0) {
                this.spinnerRef = this.start(null,determinate);
            }
            this.loadingMap.set(url, loading);
            // this.loadingSub.next(true);
        } else if (loading === false && this.loadingMap.has(url)) {
            this.loadingMap.delete(url);
        }
        if (this.loadingMap.size === 0) {
            // this.loadingSub.next(false);
            this.stop();
        }
    }

    start(spinnerConfig?, determinate?): MatDialogRef<SpinnerComponent> {

        return this.dialog.open(SpinnerComponent, {
            disableClose: true,
            // hasBackdrop: true,
            data: {
                spinnerConfig:spinnerConfig || new SpinnerConfig(),
                determinate: determinate || false
            }
        });
    };

    stop(){
        this.dialog.closeAll();
    }
}
