import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ToastService } from '@shared/services';
import { fileToBase64, isEmptyValue } from '@shared/tools';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { RequestObject } from '@shared/models';
import { CONTACT_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-contact-dialog',
  templateUrl: './add-edit-contact-dialog.component.html',
  styleUrls: ['./add-edit-contact-dialog.component.css']
})
export class AddEditContactDialogComponent implements OnInit {

  @ViewChild('matMenuTrigger') matMenuTrigger: MatMenuTrigger;

  metadata: any;
  form: UntypedFormGroup;
  params: any = {};


  constructor(
    public dialogRef: MatDialogRef<AddEditContactDialogComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute
  ) {
    this.metadata = data || {};
  }

  ngOnInit(): void {
    this.initParams();
    this.form = this.initForm(this.metadata.item);
  }

  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['formControls'] = ProjetMetadata.ficheAddEditProjet.addEditContactDialog.form.controls;
    this.params['cImageAsFile'] = null;
    this.params['cImageSrc'] = this.metadata.item?.contactImage || 'assets/images/gallery/default_avatar.png';
    this.params['menuPosition'] = { x: 0, y: 0 };
  }

  /** handle form functions */

  initForm(formData?) {
    const tempForm: UntypedFormGroup = this.formBuilder.group({});
    if (!isEmptyValue(formData)) {
      for (const control of this.params['formControls']) {
        tempForm.addControl(control.key, new FormControl(formData[control.key], (!isEmptyValue(control.validators) && Array.isArray(control.validators) ? control.validators : [])));
      }
    } else {
      for (const control of this.params['formControls']) {
        tempForm.addControl(control.key, new FormControl(null, (!isEmptyValue(control.validators) && Array.isArray(control.validators) ? control.validators : [])));
      }
    }
    return tempForm;
  }


  getFormControl(index: number) {
    return this.form.get(this.params['formControls'][index].key) as UntypedFormControl;
  }

  getLabel(index: number) {
    return this.params['formControls'][index].label;
  }

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.params['saveLoading'] = true;
      let tFormValue = { ...this.metadata.item, ...this.form.getRawValue() };
      const request: RequestObject = <RequestObject>{
        uri: CONTACT_URI.BASE_CONTACT,
        params: {
          formData: {
            data: tFormValue,
            filedata: [this.params['cImageAsFile']]
          }
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_POST,
        speCase: REQUEST_SPE_CASE.UPLOAD
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response['type'] === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * response['loaded'] / response['total']);
          } else if (response instanceof HttpResponse) {
            const result = JSON.parse(response.body.toString());
            if (result.code == ConstanteWs._CODE_WS_SUCCESS) {
              this.params['saveLoading'] = false;
              this.dialogRef.close({ data: result.payload });
              this.toast.success('general.success_save');
            } else {
              this.params['saveLoading'] = false;
              console.error(`Error in AddEditContactDialogComponent/onSave, error code :: ${result.code}`);
              this.toast.error();
            }
          }
        },
        error: (error) => {
          this.params['saveLoading'] = false;
          console.error(`Error in AddEditContactDialogComponent/onSave, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  async onContactImgSelected(event) {
    if (!['jpg', 'jpeg', 'png'].includes(event.target.files[0].name.match(/\.([^\.]+)$/)[1].toLowerCase())) {
      this.toast.error('gp.ap.formAddProject.errors.img_file_required');
      return;
    }
    this.params['cImageAsFile'] = event.target.files[0];
    const b64PrjImg = await fileToBase64(event.target.files[0]);
    if (!isEmptyValue(b64PrjImg)) {
      this.params['cImageSrc'] = b64PrjImg;
    } else {
      this.toast.error('gp.ap.formAddProject.errors.fail_loading_img');
    }
  }

  handleContactImageChnage(key: string) {
    if (key == 'deleteImg') {
      this.params['cImageAsFile'] = null;
      this.params['cImageSrc'] = 'assets/images/gallery/default_avatar.png';
    }
  }

  onChangeImgMenu(event: MouseEvent) {
    event.preventDefault();
    this.params['menuPosition'].x = event.clientX;
    this.params['menuPosition'].y = event.clientY;
    this.matMenuTrigger.openMenu();
  }

}
