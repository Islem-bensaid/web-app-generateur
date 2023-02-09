import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { fileToBase64, isEmptyValue, serializeBase64 } from '@shared/tools';

@Component({
  selector: 'app-dialog-gallery-media',
  templateUrl: './dialog-gallery-media.component.html',
  styleUrls: ['./dialog-gallery-media.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class DialogGalleryMediaComponent implements OnInit {

  serializeBase64 = serializeBase64;

  metadata: any;
  selectedImage: any;
  selectedImageIdx: any;
  imageDimensions: { w: number, h: number };
  params: any = {};


  constructor(
    public dialogRef: MatDialogRef<DialogGalleryMediaComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.metadata = data || {};

  }

  ngOnInit(): void {
    this.initParams();
  }

  async initParams() {
    this.selectedImage = this.metadata.listMedias[this.metadata.selectedIdx];
    this.selectedImageIdx = this.metadata.selectedIdx;
    if (isEmptyValue(this.metadata.type) || this.metadata.type == 'image/png') {
      await this.getImageDimensions(this.serializeBase64(this.selectedImage.base, this.metadata.type || 'image/png')).then((dimensions: any) => {
        this.imageDimensions = { h: dimensions.h * 0.639, w: dimensions.w * 0.639 };
      });
    } else {
      this.imageDimensions = { h: 300, w: 500 };
    }

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

  async move(direction: string) {
    if (isEmptyValue(this.metadata.type) || this.metadata.type == 'image/png') {
      await this.getImageDimensions(this.serializeBase64(this.selectedImage.base, this.metadata.type || 'image/png')).then((dimensions: any) => {
        this.imageDimensions = { h: dimensions.h * 0.639, w: dimensions.w * 0.639 };
      });
    } else {
      this.imageDimensions = { h: 400, w: 600 };
    }
    direction == 'next' ? this.selectedImageIdx++ : this.selectedImageIdx--;
    this.selectedImage = this.metadata.listMedias[this.selectedImageIdx];
  }

  async selectImage(index: number) {
    if (isEmptyValue(this.metadata.type) || this.metadata.type == 'image/png') {
      await this.getImageDimensions(this.serializeBase64(this.selectedImage.base, this.metadata.type || 'image/png')).then((dimensions: any) => {
        this.imageDimensions = { h: dimensions.h * 0.639, w: dimensions.w * 0.639 };
      });
    } else {
      this.imageDimensions = { h: 300, w: 500 };
    }

    this.selectedImageIdx = index;
    this.selectedImage = this.metadata.listMedias[index];
  }

  downloadImage(selectedFile) {
    let a = document.createElement('a'); //Create <a>
    a.href = 'data:'+ (this.metadata.type || 'image/png') + ';base64,' + selectedFile.base; //Image Base64 Goes here
    a.download = selectedFile.fileName; //File name Here
    a.click(); //Downloaded file
  }



  // getListMinimizedImages(listMedias: any, listDim: DOMRect) {
  //   const end = listDim.width > 120 * this.metadata.listMedias.length ? this.metadata.listMedias.length - 1 : Math.floor(listDim.width / (120 + 20));
  //   const start = end == this.metadata.listMedias.length ? 0 : this.selectedImageIdx;
  //   return listMedias.slice(start, end);
  // }
}
