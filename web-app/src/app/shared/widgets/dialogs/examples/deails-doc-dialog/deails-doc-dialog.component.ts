import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {datatableSorting, downloadLocalFile, onAction} from '@shared/tools';
import {COMMON_METADATA} from "@shared/constantes/CommonMetadata";
import {CriteriaSearch, Pagination, RequestObject, SelectMetadata, Sort} from "@shared/models";
import {SharedService} from "@shared/services/sharedWs/shared.service";
import {ConstanteWs} from "@shared/constantes/ConstanteWs";
import {DatatableComponent} from "@shared/widgets";
import {AuthentificationService} from "@publicLayout/shared/services/authentification/authentification.service";
import {ConfirmDialogService, ToastService} from "@shared/services";
import {ResponseObject} from "@shared/models/ResponseObject";
import {saveAs} from "file-saver";
import { GestionProfilsMetadata } from '@app/layouts/private-layout/shared/constantes';
import { COMMON_GED_URI } from '@privateLayout/shared/constantes/common/common-uri';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
@Component({
  selector: 'app-deails-doc-dialog',
  templateUrl: './deails-doc-dialog.component.html',
  styleUrls: ['./deails-doc-dialog.component.css']
})
export class DeailsDocDialogComponent implements OnInit {


  @ViewChild('attachFielsDatatable') attachFielsDatatable: DatatableComponent;
  @ViewChild("fileUpload") fileUpload: HTMLInputElement;

  onAction = onAction;
  metadata: any;
  form: UntypedFormGroup;
  params: any = {};

  ficheDetailsMetadata: any;
  constructor(
      private dialogRef: MatDialogRef<DeailsDocDialogComponent, { data: any }>,
      @Inject(MAT_DIALOG_DATA) data,
      private formBuilder: UntypedFormBuilder,
      private sharedService: SharedService,
      private authentificationService: AuthentificationService,
      private toast: ToastService,
      private confirmDialogService: ConfirmDialogService,
  ) {
      this.metadata = data || {};
  }

  ngOnInit(): void {
    this.ficheDetailsMetadata= GestionProfilsMetadata.ficheDetailsDocument
      this.initMetadata();
      this.initParams();
      this.initListNm();
      this.form = this.initForm();
      this.initListAttachFiles();
      this.initListDocuments();

  }

  initMetadata() {
      this.metadata['title'] = this.metadata['title'] || 'general.add_doc_dialog.titledetatails'
  }
  initListDocuments() {
        this.params['ficheDetailsMetadata'].searchObject.dataSearch = [new CriteriaSearch('idRequete', this.params['pathParams']['idRequete'], '=')];
        const request: RequestObject = <RequestObject>{
            uri: '',
            params: {
                body: this.params['ficheDetailsMetadata'].searchObject
            },
            microservice: ConstanteWs._CODE_APPLICATION,
            method: ConstanteWs._CODE_POST
        };
        this.sharedService.commonWs(request).subscribe({
            next: (response: ResponseObject) => {
                if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
                    this.params['ficheDetailsMetadata'].responsePayload = {...response.payload};
                } else {
                    console.error(`Error in DeailsDocDialogComponent/initListDocuments, error code :: ${response.code}`);
                    this.toast.error();
                }
            },
            error: (error) => {
                console.error(`Error in DeailsDocDialogComponent/initListDocuments, error :: ${error}`);
                this.toast.error();
            }
        });
    
}

  initParams() {
    this.params["ficheDetailsMetadata"] = {
      metadata: GestionProfilsMetadata.ficheDetailsDocument,
      data: [],
      // searchObject: initSearchObject()
    };
      this.params['formControls'] = COMMON_METADATA.dialogAddDoc.form.controls;
      this.params['typeDoc'] = {
          metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({label: this.getLabel(1), value: 'id'}),
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
      this.params['pagination'] = {limit: 5, offSet: 0};
  }

  async initListNm() {
      this.params.typeDoc.data = await this.sharedService.getListNm('LIST_TYPE_DOCUMENT');
  }

  initForm() {
      const tempForm: UntypedFormGroup = this.formBuilder.group({});
      if (this.metadata.item) {
          for (const control of this.params['formControls'] ) {
              tempForm.addControl(control.key, new FormControl(this.metadata.item[control.key], (control.required ? [Validators.required] : [])));
          }
      } else {
          for (const control of this.params['formControls'] ) {
              tempForm.addControl(control.key, new FormControl(null, (control.required ? [Validators.required] : [])));
          }
      }
      return tempForm;
  }


  initListAttachFiles() {
      if (this.metadata.item) {
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
                      this.params['listAttachFiles'] = this.params['listAttachFiles'].map(f=>({...f, name: f.fileName}))
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



  getLabel(idx: number) {
      return this.params['formControls'][idx].label;
  }

  onSortTableAtachFiles(sort: Sort) {
      this.onPaginateTableAtachFiles({limit: 5, offSet: 0}, datatableSorting(this.params.listAttachFiles, sort))
  }

  onPaginateTableAtachFiles(pagination: Pagination, dataList = this.params.listAttachFiles) {
      if (dataList.length) {
          this.params['pagination'] = pagination;
          const start = pagination.offSet * pagination.limit;
          const end = start + pagination.limit;
          this.params.tableAtachFiles.responsePayload = {
              data: [...dataList.slice(start, end)],
              total: dataList.length,
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
              total: 0,
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
                          this.toast.success("general.success_delete");
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


  onFileSelected(event) {
      const filesList: FileList = event.target.files;
      const tempListFiles = [] as File[];
      for (let i = 0; i < filesList.length; i++) {
          tempListFiles.push(filesList.item(i));
      }
      this.params.listAttachFiles.push(...tempListFiles);
      this.onPaginateTableAtachFiles(this.params['pagination']);
  }

}
