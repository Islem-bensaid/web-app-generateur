import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ToastService } from '@shared/services';
import { isEmptyValue } from '@shared/tools';
import { RequestObject, SelectMetadata } from '@shared/models';
import { COMMON_METADATA } from '@shared/constantes/CommonMetadata';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { AREA_OF_CONCERS } from '@privateLayout/shared/constantes/projet/projet-uri';
import { DashboardMetadata } from '@privateLayout/shared/constantes/dashboard/dashboard-metadata';

@Component({
  selector: 'app-dialog-add-area',
  templateUrl: './dialog-add-area.component.html',
  styleUrls: ['./dialog-add-area.component.css']
})
export class DialogAddAreaComponent implements OnInit {
  metadata: any;
  form: UntypedFormGroup;
  params: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogAddAreaComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private toast: ToastService,
  ) {
    this.metadata = data || {};
  }


  ngOnInit(): void {
    this.initParams();
    this.form = this.initForm(this.metadata.item || {status: 'Open'});
  }


  initParams() {
    this.params['formControls'] = DashboardMetadata.AreasDialog.form.controls;

    this.params['severity'] = {
      metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
        label: 'Severity',
        value: 'code',
        optionLabel: 'code',
        reset: true,
        filter: false
      }),
      data: [
        {
          code: "Normal",
        },
        {
          code: "Warning",
        },
        {
          code: "Critical",
        }
      ]
    }

    this.params['status'] = {
      metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
        label: 'Status',
        value: 'code',
        optionLabel: 'code',
        reset: true,
        filter: false
      }),
      data: [
        {
          code: "Open",
        },
        {
          code: "Closed",
        }
      ]
    };
  }


  /** handle form functions */

  initForm(formData?) {
    const tempForm: UntypedFormGroup = this.formBuilder.group({});
    if (!isEmptyValue(formData)) {
      for (const control of this.params['formControls']) {
        tempForm.addControl(control.key, new FormControl({ value:formData[control.key], disabled: control.disabled  &&  isEmptyValue(formData.id)}, (control.required ? [Validators.required] : [])));
      }
    } else {
      for (const control of this.params['formControls']) {
        tempForm.addControl(control.key, new FormControl({ value: null, disabled: control.disabled }, (control.required ? [Validators.required] : [])));
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
      let tFormValue = { ...this.metadata.item, ...this.form.getRawValue(), idProjet:  this.metadata.idProject};
      const request: RequestObject = <RequestObject>{
        uri: AREA_OF_CONCERS.BASE_AREA_OF_CONCERS,
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
            console.error(`Error in DialogAddAreaComponent/onSave, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          this.params['saveLoading'] = false;
          console.error(`Error in DialogAddAreaComponent/onSave, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }
}
