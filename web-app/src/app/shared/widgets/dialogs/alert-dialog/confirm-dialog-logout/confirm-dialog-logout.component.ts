import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {TranslateService} from '@ngx-translate/core';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-confirm-dialog-logout',
    templateUrl: './confirm-dialog-logout.component.html',
    styleUrls: ['./confirm-dialog-logout.component.css'],
})
export class ConfirmDialogLogoutComponent implements OnInit {
    minute = 'minute';
    title = 'confirm_logout';
    description = 'general.confirm_dialog.description';
    time = environment.Session.expired / 60;
    public idleState: string;
    public minutes: any;

    constructor(
        private idle: Idle,
        private keepalive: Keepalive,
        private translate: TranslateService,
        public dialogRef: MatDialogRef<ConfirmDialogLogoutComponent, boolean>,
        @Inject(MAT_DIALOG_DATA)
            data: {
            title?: string;
            description?: string;
        }
    ) {
        const {title, description} = data;

        this.setTitle(title);
        this.setDescription(description);
    }

    ngOnInit(): void {
    }

    setTitle(title?: string) {
        if (Boolean(title)) {
            this.title = title;
        }
    }

    setDescription(description?: string) {
        if (Boolean(description)) {
            this.description = description;
        }
    }

    respond(confirm: boolean) {
        this.dialogRef.close(confirm);
    }
}
