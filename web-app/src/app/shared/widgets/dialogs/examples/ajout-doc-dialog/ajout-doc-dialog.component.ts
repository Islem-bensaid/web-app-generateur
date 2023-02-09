import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { datatableSorting, downloadLocalFile, isEmptyValue, onAction } from '@shared/tools';
import { COMMON_METADATA } from '@shared/constantes/CommonMetadata';
import { Pagination, RequestObject, SelectMetadata, Sort } from '@shared/models';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { pagination } from '@shared/constantes';
import { DatatableComponent } from '@shared/widgets';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { ResponseObject } from '@shared/models/ResponseObject';
import { saveAs } from 'file-saver';
import { COMMON_GED_URI } from '@privateLayout/shared/constantes/common/common-uri';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';

@Component({
  selector: 'app-ajout-doc-dialog',
  templateUrl: './ajout-doc-dialog.component.html',
  styleUrls: ['./ajout-doc-dialog.component.css']
})
export class AjoutDocDialogComponent implements OnInit {

  @ViewChild('attachFielsDatatable') attachFielsDatatable: DatatableComponent;
  @ViewChild('fileUpload') fileUpload: HTMLInputElement;

  onAction = onAction;
  metadata: any;
  form: UntypedFormGroup;
  params: any = {};


  constructor(
    public dialogRef: MatDialogRef<AjoutDocDialogComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private toast: ToastService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.metadata = data || {};
  }

  ngOnInit(): void {
    this.initMetadata();
    this.initParams();
    this.initListNm();
    this.form = this.initForm();
    this.initListAttachFiles();
  }

  initMetadata() {
    this.metadata['title'] = this.metadata['title'] || 'general.add_doc_dialog.title';
  }

  initParams() {
    this.params['formControls'] = COMMON_METADATA.dialogAddDoc.form.controls;
    this.params['typeDoc'] = {
      metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
        label: this.getLabel(1),
        value: 'code',
        optionLabel: 'label'
      }),
      data: []
    };
    this.params['tableAtachFiles'] = {
      metadata: COMMON_METADATA.dialogAddDoc.tableAtachFiles,
      responsePayload: {
        data: [],
        total: 0
      }
    };
    this.params['listAttachFiles'] = [] as File[];
    this.params['pagination'] = { limit: 5, offSet: 0 };
  }

  async initListNm() {
    this.params.typeDoc.data = COMMON_METADATA.dialogAddDoc.mediaTypesList;
  }

  initForm() {
    const tempForm: UntypedFormGroup = this.formBuilder.group({});
    if (!isEmptyValue(this.metadata.item)) {
      for (const control of this.params['formControls']) {
        tempForm.addControl(control.key, new FormControl(this.metadata.item[control.key], (control.required ? [Validators.required] : [])));
      }
    } else {
      for (const control of this.params['formControls']) {
        tempForm.addControl(control.key, new FormControl(null, (control.required ? [Validators.required] : [])));
      }
    }
    return tempForm;
  }


  initListAttachFiles() {
    if (!isEmptyValue(this.metadata.item?.idNodeRef)) {
      const request: RequestObject = <RequestObject>{
        uri: COMMON_GED_URI.LIST_FICHIER,
        params: {
          query: {
            nodeRef: this.metadata.item.idNodeRef
          }
        },
        microservice: ConstanteWs._CODE_GED,
        method: ConstanteWs._CODE_GET
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.params['listAttachFiles'] = [...response.payload];
            this.params['listAttachFiles'] = this.params['listAttachFiles'].map(f => ({ ...f, name: f.fileName }));
            this.onPaginateTableAtachFiles(this.params['pagination']);
          } else {
            console.error(`Error in AjoutDocDialogComponent/initListAttachFiles, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in AjoutDocDialogComponent/initListAttachFiles, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  getFormControl(idx: number) {
    return this.form.get(this.params['formControls'][idx].key) as UntypedFormControl;
  }

  getLabel(idx: number) {
    return this.params['formControls'][idx].label;
  }

  onSortTableAtachFiles(sort: Sort) {
    this.onPaginateTableAtachFiles({ limit: 5, offSet: 0 }, datatableSorting(this.params.listAttachFiles, sort));
  }

  onPaginateTableAtachFiles(pagination: Pagination, dataList = this.params.listAttachFiles) {
    if (dataList.length) {
      this.params['pagination'] = pagination;
      const start = pagination.offSet * pagination.limit;
      const end = start + pagination.limit;
      this.params.tableAtachFiles.responsePayload = {
        data: [...dataList.slice(start, end)],
        total: dataList.length
      };
      if (this.params.tableAtachFiles.responsePayload.data.length == 0) {
        this.params['pagination'].offSet--;
        if (this.attachFielsDatatable.paginatorComponent.paginator.hasPreviousPage()) {
          this.attachFielsDatatable.paginatorComponent.paginator.previousPage();
        }
        this.onPaginateTableAtachFiles(this.params['pagination']);
      }
    } else {
      this.params.tableAtachFiles.responsePayload = {
        data: [],
        total: 0
      };
    }
  }


  onAddTableAtachFiles() {
    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    element.click();
  }

  onDeleteTableAtachFiles(row) {
    this.confirmDialogService.confirm('', 'general.delete_confirmation').subscribe(flag => {
      if (flag) {
        if (row.item.nodeRef) {
          const request: RequestObject = <RequestObject>{
            uri: COMMON_GED_URI.DELETE_FICHIER,
            params: {
              path: [row.item.nodeRef]
            },
            microservice: ConstanteWs._CODE_GED,
            method: ConstanteWs._CODE_DELETE
          };
          this.sharedService.commonWs(request).subscribe({
            next: (response: ResponseObject) => {
              if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
                this.toast.success('general.success_delete');
                this.initListAttachFiles();
              } else {
                console.error(`Error in AjoutDocDialogComponent/onDeleteTableAtachFiles, error code :: ${response.code}`);
                this.toast.error();
              }
            },
            error: (error) => {
              console.error(`Error in AjoutDocDialogComponent/onDeleteTableAtachFiles, error :: ${error}`);
              this.toast.error();
            }
          });
        } else {
          this.params.listAttachFiles.splice(row.index, 1);
          this.onPaginateTableAtachFiles({ limit: 5, offSet: 0 }, this.params.listAttachFiles);
        }

      }
    });
  }

  async onDownloadTableAtachFiles(row) {
    if (row.item.nodeRef) {
      const request: RequestObject = <RequestObject>{
        uri: COMMON_GED_URI.DOWNLOAD_FICHIER,
        params: {
          query: {
            nodeRef: row.item.nodeRef
          }
        },
        microservice: ConstanteWs._CODE_GED,
        method: ConstanteWs._CODE_GET,
        speCase: REQUEST_SPE_CASE.DOWNLOAD
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response) => {
          const blob: any = new Blob([response], {
            type: 'application/octet-stream'
          });
          saveAs(blob, row.item.fileName);
          this.toast.success('general.success_download');
        },
        error: (error) => {
          console.error(`Error in AjoutDocDialogComponent/onDownloadTableAtachFiles, error :: ${error}`);
          this.toast.error();
        }
      });
    } else {
      await downloadLocalFile(row.item);
    }
    return;
  }

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.metadata['item'] ||= {};
      let tFormValue = {
        ...this.metadata.item,
        ...this.form.value
      };
      const request: RequestObject = <RequestObject>{
        uri: COMMON_GED_URI.SAVE_DOCUMENT,
        params: {
          formData: {
            document: tFormValue,
            filedata: this.params.listAttachFiles
          }
        },
        microservice: ConstanteWs._CODE_GED,
        method: ConstanteWs._CODE_POST,
        speCase: REQUEST_SPE_CASE.UPLOAD
      };
      this.params['saveDocLoading'] = true;
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response['type'] === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * response['loaded'] / response['total']);
          } else if (response instanceof HttpResponse) {
            const result = JSON.parse(response.body.toString());
            if (result.code === ConstanteWs._CODE_WS_SUCCESS) {
              this.dialogRef.close({ data: result });
              this.toast.success('general.success_save');
              this.params['saveDocLoading'] = false;
            } else {
              console.error(`Error in AjoutDocDialogComponent/onSave, error code :: ${result.code}`);
              this.toast.error();
              this.params['saveDocLoading'] = false;
            }
          }
        },
        error: (error) => {
          console.error(`Error in AjoutDocDialogComponent/onSave, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  onFileSelected(event) {
    const filesList: FileList = event.target.files;
    const tempListFiles = [] as File[];
    for (let i = 0; i < filesList.length; i++) {
      tempListFiles.push(filesList.item(i));
    }
    console.log('tempListFiles', tempListFiles);
    for (const file of tempListFiles) {
      if (file.size == 0) {
        this.toast.error('general.add_doc_dialog.errors.file_invalid_size');
        return;
      }
      if (Array.isArray(this.acceptedFilesTypes)) {
        for (let i = 0; i < this.acceptedFilesTypes.length; i++) {
          console.log('file.type.match(this.acceptedFilesTypes[i])', file.type.match(this.acceptedFilesTypes[i]));
          if (file.type.match(this.acceptedFilesTypes[i]) != null) {
            break;
          }
          if (i == this.acceptedFilesTypes.length - 1) {
            this.toast.error('general.add_doc_dialog.errors.file_invalid_type');
            return;
          }
        }
      } else {
        if (file.type.match(this.acceptedFilesTypes) == null) {
          this.toast.error('general.add_doc_dialog.errors.file_invalid_type');
          return;
        }
      }
    }
    this.params.listAttachFiles.push(...tempListFiles);
    this.onPaginateTableAtachFiles(this.params['pagination']);
  }

  get acceptedFilesTypes() {
    switch (this.metadata.type) {
      case ROUTING_TYPES.PR:
        return 'image/*';
      case ROUTING_TYPES.VR:
        return 'video/*';
      case ROUTING_TYPES.HSER:
      case ROUTING_TYPES.MOM:
      case ROUTING_TYPES.RR:
      case ROUTING_TYPES.MR:
      case ROUTING_TYPES.DR:
      case ROUTING_TYPES.DDra:
      case ROUTING_TYPES.ID:
      case ROUTING_TYPES.SD:
      case ROUTING_TYPES.AD:
      case ROUTING_TYPES.RFI:
      case ROUTING_TYPES.MIR:
      case ROUTING_TYPES.MS:
      case ROUTING_TYPES.WIR:
      case ROUTING_TYPES.SI:
      case ROUTING_TYPES.NCRs:
      case ROUTING_TYPES.NC:
      case ROUTING_TYPES.VReq:
      case ROUTING_TYPES.AV:
      case ROUTING_TYPES.PC:
      case ROUTING_TYPES.MReg:
        return ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/csv'];
    }
  }

  get msgAcceptedFileTypes() {
    switch (this.metadata.type) {
      case ROUTING_TYPES.PR:
        return 'media.pr/vr.details.errors.img_file_required';
      case ROUTING_TYPES.VR:
        return 'media.pr/vr.details.errors.video_file_required';
      case ROUTING_TYPES.HSER:
      case ROUTING_TYPES.MOM:
      case ROUTING_TYPES.RR:
      case ROUTING_TYPES.MR:
      case ROUTING_TYPES.DR:
      case ROUTING_TYPES.DDra:
      case ROUTING_TYPES.ID:
      case ROUTING_TYPES.SD:
      case ROUTING_TYPES.AD:
      case ROUTING_TYPES.RFI:
      case ROUTING_TYPES.MIR:
      case ROUTING_TYPES.MS:
      case ROUTING_TYPES.WIR:
      case ROUTING_TYPES.SI:
      case ROUTING_TYPES.NCRs:
      case ROUTING_TYPES.NC:
      case ROUTING_TYPES.VReq:
      case ROUTING_TYPES.AV:
      case ROUTING_TYPES.PC:
      case ROUTING_TYPES.MReg:
        return 'documents.details.errors.excel_doc_pdf_file_required';
      default:
        return '';
    }
  }

}
