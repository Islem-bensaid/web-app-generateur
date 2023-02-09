import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { AppTranslateService, ConfirmDialogService, LoadingService, ToastService } from '@shared/services';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { datatableSorting, downloadLocalFile, isEmptyValue, onAction } from '@shared/tools';
import { Pagination, RequestObject, Sort } from '@shared/models';
import { COMMON_GED_URI } from '@privateLayout/shared/constantes/common/common-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
import { saveAs } from 'file-saver';
import {
  DialogGalleryMediaComponent
} from '@shared/widgets/dialogs/examples/dialog-gallery-media/dialog-gallery-media.component';
import { map } from 'rxjs/operators';
import { DatatableComponent } from '@shared/widgets';
import { EXECUTIVE_REPORTS } from '@privateLayout/shared/constantes/projet/projet-uri';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-add-executive-report',
  templateUrl: './dialog-add-executive-report.component.html',
  styleUrls: ['./dialog-add-executive-report.component.css']
})
export class DialogAddExecutiveReportComponent implements OnInit {

  onAction = onAction;

  @ViewChild('imagesDatatable') imagesDatatable: DatatableComponent;

  metadata: any;
  form: UntypedFormGroup;
  params: any = {};


  constructor(
    public dialogRef: MatDialogRef<DialogAddExecutiveReportComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private toast: ToastService,
    private dialog: MatDialog,
    private appTranslateService: AppTranslateService,
    private confirmDialogService: ConfirmDialogService,
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

    this.params['formControls'] = ProjetMetadata.ficheAddEditProjet.addEditExecutiveReport.form.controls;

    this.params['tableListImages'] = {
      metadata: ProjetMetadata.ficheAddEditProjet.tableListImages,
      responsePayload: {
        data: [],
        total: 0
      },
      listAttachFiles: [] as File[],
      pagination: { limit: 5, offSet: 0 }
    };
  }


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
      let tFormValue = { ...this.metadata.item, ...this.form.getRawValue(), idProjet: this.metadata.idProject };
      const request: RequestObject = <RequestObject>{
        uri: EXECUTIVE_REPORTS.BASE_EXECUTIVE_REPORTS,
        params: {
          formData: {
            data: tFormValue,
            filedata: this.params.tableListImages.listAttachFiles
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
            LoadingService.SPINNER_PROGRESS_CONFIG.value = percentDone;
            LoadingService.SPINNER_PROGRESS_CONFIG.msg = percentDone + ' %';

          } else if (response instanceof HttpResponse) {

            const result = JSON.parse(response.body.toString());
            if (result.code == ConstanteWs._CODE_WS_SUCCESS) {
              this.params['saveLoading'] = false;
              this.dialogRef.close({ data: result.payload });
              this.toast.success('general.success_save');
            } else {
              this.params['saveLoading'] = false;
              console.error(`Error in DialogAddExecutiveReportComponent/onSave, error code :: ${result.code}`);
              this.toast.error();
            }
          }
        },
        error: (error) => {
          this.params['saveLoading'] = false;
          console.error(`Error in DialogAddExecutiveReportComponent/onSave, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }


  initListProjectMedias(mediasList = []) {
    this.params.tableListImages.listAttachFiles = mediasList;
    this.params.tableListImages.listAttachFiles = this.params.tableListImages.listAttachFiles.map(f => ({
      ...f,
      name: f.fileName
    }));
    this.onPaginateTableListImages(this.params.tableListImages.pagination);
  }

  onImagesSelected(event) {
    const filesList: FileList = event.target.files;
    const imgRegEx = new RegExp('image/*');
    for (let i = 0; i < filesList.length; i++) {
      if (!imgRegEx.test(filesList.item(i).type)) {
        this.toast.error('gp.ap.tableListExecutiveReports.errors.only_image_are_accepted');
        return;
      }
    }
    const tempListFiles = [] as File[];
    for (let i = 0; i < filesList.length; i++) {
      tempListFiles.push(filesList.item(i));
    }
    this.params.tableListImages.listAttachFiles.push(...tempListFiles);
    this.onPaginateTableListImages(this.params.tableListImages.pagination);
  }

  onSortTableListImages(sort: Sort) {
    this.onPaginateTableListImages({
      limit: 5,
      offSet: 0
    }, datatableSorting(this.params.tableListImages.listAttachFiles, sort));
  }

  onPaginateTableListImages(pagination: Pagination, dataList = this.params.tableListImages.listAttachFiles) {
    if (dataList.length) {
      this.params.tableListImages.pagination = pagination;
      const start = pagination.offSet * pagination.limit;
      const end = start + pagination.limit;
      this.params.tableListImages.responsePayload = {
        data: [...dataList.slice(start, end)],
        total: dataList.length
      };
      if (this.params.tableListImages.responsePayload.data.length == 0) {
        this.params.tableListImages.pagination.offSet--;
        if (this.imagesDatatable.paginatorComponent.paginator.hasPreviousPage()) {
          this.imagesDatatable.paginatorComponent.paginator.previousPage();
        }
        this.onPaginateTableListImages(this.params.tableListImages.pagination);
      }
    } else {
      this.params.tableListImages.responsePayload = {
        data: [],
        total: 0
      };
    }
  }


  onAddTableListImages() {
    // let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    let element: HTMLElement = document.querySelector('.upload-project-images') as HTMLElement;
    element.click();
  }

  onDeleteTableListImages(row) {
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
                this.initListProjectMedias();
              } else {
                console.error(`Error in AddEditProjetComponent/onDeleteTableListImages, error code :: ${response.code}`);
                this.toast.error();
              }
            },
            error: (error) => {
              console.error(`Error in AddEditProjetComponent/onDeleteTableListImages, error :: ${error}`);
              this.toast.error();
            }
          });
        } else {
          this.params.tableListImages.listAttachFiles.splice(row.index, 1);
          this.onPaginateTableListImages({
            limit: 5,
            offSet: 0
          }, this.params.tableListImages.listAttachFiles);
        }

      }
    });
  }

  async onDownloadTableListImages(row) {
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
          console.error(`Error in AddEditProjetComponent/onDownloadTableListImages, error :: ${error}`);
          this.toast.error();
        }
      });
    } else {
      await downloadLocalFile(row.item);
    }
    return;
  }

  openImageTableListImages(row) {
    const metadata = {
      listMedias: this.params.tableListImages.listAttachFiles,
      selectedIdx: row.index
    };
    // this.sharedService
    //   .openDialog(DialogGalleryMediaComponent, metadata)
    //   .subscribe((response) => {
    //     if (response) {
    //       this.initListContacts();
    //     }
    //   });

    this.dialog.open(DialogGalleryMediaComponent, {
      disableClose: true,
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      direction: this.appTranslateService.getDir(),
      autoFocus: true,
      data: metadata
    }).afterClosed().pipe(map((response) => response.data));
  }

}
