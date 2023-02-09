import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-dialog-error',
    templateUrl: './dialog-error.component.html',
    styleUrls: ['./dialog-error.component.css'],
})
export class DialogErrorComponent implements OnInit {
    msg = '';
    mutlimsgs = false;
    listmsg = [];

    ngOnInit(): void {
    }

    constructor(
        public dialogRef: MatDialogRef<DialogErrorComponent, boolean>,
        private translate: TranslateService,
        @Inject(MAT_DIALOG_DATA)
            data: {
            msg?: string;
            mutlimsgs?: boolean;
            listmsg?: [];
        }
    ) {
        this.mutlimsgs = data?.mutlimsgs;
        if (!this.mutlimsgs && !data?.mutlimsgs) {
            this.setTitle(data.msg);
        } else if (data?.mutlimsgs) {
            this.setTitlemsgs(data.listmsg);
        }
    }

    setTitle(title?: string) {
        if (Boolean(title)) {
            this.msg = title;
        }
    }

    setTitlemsgs(title?: []) {
        if (Boolean(title)) {
            this.listmsg = title;
        }
    }

    respond(confirm: boolean) {
        this.dialogRef.close(confirm);
    }
}
