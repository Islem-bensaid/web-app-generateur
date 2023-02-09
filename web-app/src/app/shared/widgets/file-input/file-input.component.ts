import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {ToastService} from '../../services/toast/toast.service';
import {octetsToMegaBytes} from '../../tools/utils/octet';

@Component({
    selector: 'st2i-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.css'],
})
export class FileInputComponent implements OnInit {
    @Input() multiple = false;
    @Input() label = 'files';
    @Output() selectFile = new EventEmitter<File>();
    @Output() selectFiles = new EventEmitter<File[]>();
    @Input() control2: UntypedFormControl;
    upload = environment.upload;
    control = new UntypedFormControl();

    constructor(private toast: ToastService) {
    }

    ngOnInit(): void {
        this.control.disable();
    }

    checkFileSize(files: File[]) {
        return files.some((file) => file.size < environment.upload.maxSize);
    }

    showFileSizeError() {
        this.toast.error('cannot_upload_file_with_more_than', {
            mega_bytes: octetsToMegaBytes(environment.upload.maxSize),
        });
    }

    onChange($event: Event) {
        const target = $event.target as HTMLInputElement;
        const files = Object.values(target.files);

        if (!this.checkFileSize(files)) {
            this.showFileSizeError();
            target.value = '';
            return;
        }

        if (this.multiple) {
            const names = files.map((file) => file.name).join(', ');
            this.control.setValue(names);
            this.selectFiles.emit(files);
        } else {
            const name = files[0]?.name;
            this.control.setValue(name);
            this.selectFile.emit(files[0]);
        }
    }
}
