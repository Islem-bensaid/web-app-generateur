import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { isEmptyValue, isInputChanged, serializeBase64 } from '@app/shared/tools';

@Component({
  selector: 'app-inner-gallery-media',
  templateUrl: './inner-gallery-media.component.html',
  styleUrls: ['./inner-gallery-media.component.css']
})
export class InnerGalleryMediaComponent implements OnInit {

  serializeBase64 = serializeBase64;

  @Input() metadata: any;

  selectedImage: any;
  selectedImageIdx: any;
  imageDimensions: { w: number, h: number };
  params: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isInputChanged(changes, 'metadata')) {
      if (changes.metadata) {
        if (changes.metadata.currentValue !== changes.metadata.previousValue) {
          this.metadata = changes.metadata.currentValue;
          if (!isEmptyValue(this.metadata.listMedias) && this.metadata.listMedias?.length > 0) {
            this.selectedImage = this.metadata.listMedias[0];
            this.selectedImageIdx = 0;
            this.initParams();
          }
        }
      }
    }
  }

  async initParams() {
    await this.getImageDimensions(this.serializeBase64(this.selectedImage.base, 'image/png')).then((dimensions: any) => {
      this.imageDimensions = { h: dimensions.h * 0.639, w: dimensions.w * 0.639 };
    });
  }

  getImageDimensions(file) {
    return new Promise(function(resolved, rejected) {
      var i = new Image();
      i.onload = function() {
        resolved({ w: i.width, h: i.height });
      };
      i.src = file;
    });
  }

  move(direction: string) {
    direction == 'next' ? this.selectedImageIdx++ : this.selectedImageIdx--;
    this.selectedImage = this.metadata.listMedias[this.selectedImageIdx];
  }

  downloadImage(selectedFile) {
    let a = document.createElement('a'); //Create <a>
    a.href = 'data:image/png;base64,' + selectedFile.base; //Image Base64 Goes here
    a.download = selectedFile.fileName; //File name Here
    a.click(); //Downloaded file
  }

  selectImage(index: number) {
    this.selectedImageIdx = index;
    this.selectedImage = this.metadata.listMedias[index];
  }

}
