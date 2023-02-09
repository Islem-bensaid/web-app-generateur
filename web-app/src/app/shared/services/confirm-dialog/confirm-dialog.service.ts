import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent, ConfirmDialogLogoutComponent, DialogErrorComponent} from '../../widgets';
import {AppTranslateService} from '@shared/services';

@Injectable({
    providedIn: 'root',
})
export class ConfirmDialogService {
    constructor(
        private dialog: MatDialog,
        private appTranslateService: AppTranslateService
    ) {
    }

    confirm(
        title?: string,
        description?: string,
        count?: any,
        withcheckbox?: boolean,
        labelcheckBox?: string,
        btn1Label?: string,
        btn2Label?: string,
    ): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {title, description, count, withcheckbox, labelcheckBox,btn1Label, btn2Label},
            panelClass: 'custom-dialog-container',
            disableClose: true,
            width: '35%',
            direction: this.appTranslateService.getDir(),
            autoFocus: true,
        });
        return dialogRef.afterClosed();
    }

    confirmLogin(title?: string, description?: string): Observable<any> {
        const dialogRef2 = this.dialog.open(ConfirmDialogLogoutComponent, {
            data: {title, description},
        });
        return dialogRef2.afterClosed();
    }

    close() {
        this.dialog.closeAll();
    }

    error(msg: string, mutlimsgs?: boolean, listmsg?: []): Observable<boolean> {
        const dialogRef = this.dialog.open(DialogErrorComponent, {
            data: {msg, mutlimsgs, listmsg},
            panelClass: 'custom-dialog-container',
            disableClose: true,
            width: '35%',
            direction: this.appTranslateService.getDir(),
            autoFocus: true,
        });
        return dialogRef.afterClosed();
    }
}
