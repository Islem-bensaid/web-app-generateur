import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ToastService } from '@shared/services';
import { LiveCameraMetadata } from '@privateLayout/shared/constantes/media/media-metadata';
import { isEmptyValue } from '@shared/tools';
import { RequestObject } from '@shared/models';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { MEDIA_URI } from '@privateLayout/shared/constantes/media/media-uri';

@Component({
  selector: 'app-dialog-add-edit-camera',
  templateUrl: './dialog-add-edit-camera.component.html',
  styleUrls: ['./dialog-add-edit-camera.component.css']
})
export class DialogAddEditCameraComponent implements OnInit {

  metadata: any;
  form: UntypedFormGroup;
  params: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogAddEditCameraComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private toast: ToastService,
  ) {
    this.metadata = data || {};
  }

  ngOnInit(): void {
    this.initParams();
    this.form = this.initForm(this.metadata.item);
  }


  initParams() {
    this.params['formControls'] = LiveCameraMetadata.liveCameraDialog.form.controls;
  }


  /** handle form functions */

  initForm(formData?) {
    const tempForm: UntypedFormGroup = this.formBuilder.group({});
    if (!isEmptyValue(formData)) {
      for (const control of this.params['formControls']) {
        tempForm.addControl(control.key, new FormControl(formData[control.key], (control.required ? [Validators.required] : [])));
      }
    } else {
      for (const control of this.params['formControls']) {
        tempForm.addControl(control.key, new FormControl(null, (control.required ? [Validators.required] : [])));
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
      let tFormValue = { ...this.metadata.item, ...this.form.getRawValue()};
      const request: RequestObject = <RequestObject>{
        uri: MEDIA_URI.LIVE_CAMERA_URI.LIVE_CAMERA_BASE,
        params: {
          body: tFormValue
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_POST
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.params['saveLoading'] = false;
            this.dialogRef.close({ data: response.payload });
            this.toast.success('general.success_save');
          } else {
            this.params['saveLoading'] = false;
            console.error(`Error in DialogAddEditCameraComponent/onSave, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          this.params['saveLoading'] = false;
          console.error(`Error in DialogAddEditCameraComponent/onSave, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }
}
