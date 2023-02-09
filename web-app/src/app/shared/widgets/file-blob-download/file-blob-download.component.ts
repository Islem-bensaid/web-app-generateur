import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'st2i-file-blob-download',
    templateUrl: './file-blob-download.component.html',
    styleUrls: ['./file-blob-download.component.css'],
})
export class FileBlobDownloadComponent implements OnInit, OnChanges {
    @Input() blob: Blob;
    @Input() name: string;

    file?: { href: SafeUrl; download: string };

    constructor(private sanitizeFn: DomSanitizer) {
    }

    ngOnInit(): void {
    }

    hasChanged(change?: SimpleChange) {
        return Boolean(change) && change.previousValue !== change.currentValue;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const {blob, name} = changes;

        if (this.hasChanged(blob) || this.hasChanged(name)) {
            this.setFile();
        }
    }

    setFile() {
        this.file = {
            href: this.sanitizeFn.bypassSecurityTrustUrl(
                window.URL.createObjectURL(this.blob)
            ),
            download: this.name,
        };
    }
}
