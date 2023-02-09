import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import {
  datatableSorting,
  downloadLocalFile,
  fileToBase64,
  initSearchObject,
  isEmptyValue,
  onAction
} from '@shared/tools';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaSearch, Pagination, RequestObject, SearchObject, SelectMetadata, Sort } from '@shared/models';
import { CONTACT_URI, EXECUTIVE_REPORTS, PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ResponseObject } from '@shared/models/ResponseObject';
import { AppTranslateService, ConfirmDialogService, ToastService } from '@shared/services';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';
import { ForgeAuthentificationService } from '@privateLayout/shared/services/forge-authentification.service';
import { BIM360_URI } from '@privateLayout/shared/constantes/projet/bim360-uri';
import { map } from 'rxjs/operators';
import moment from 'moment';
import { COMMON_METADATA } from '@shared/constantes/CommonMetadata';
import {
  AddEditContactDialogComponent
} from '@privateLayout/features/projet/add-edit-projet/add-edit-contact-dialog/add-edit-contact-dialog.component';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
import { COMMON_GED_URI } from '@privateLayout/shared/constantes/common/common-uri';
import { saveAs } from 'file-saver';
import { DatatableComponent } from '@shared/widgets';
import {
  DialogGalleryMediaComponent
} from '@shared/widgets/dialogs/examples/dialog-gallery-media/dialog-gallery-media.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import {
  TreeViewBimDocManagementComponent
} from '@privateLayout/features/projet/add-edit-projet/tree-view-bim-doc-management/tree-view-bim-doc-management.component';

@Component({
  selector: 'app-add-edit-projet',
  templateUrl: './add-edit-projet.component.html',
  styleUrls: ['./add-edit-projet.component.css']
})
export class AddEditProjetComponent implements OnInit {

  @ViewChild('projectImagesDatatable') projectImagesDatatable: DatatableComponent;
  @ViewChild('treeViewBimDocManagementComponent') treeViewBimDocManagementComponent: TreeViewBimDocManagementComponent;

  form: UntypedFormGroup;
  params: any = {};
  onAction = onAction;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private toast: ToastService,
    private router: Router,
    private dialog: MatDialog,
    private appTranslateService: AppTranslateService,
    private confirmDialogService: ConfirmDialogService
  ) {
  }

  ngOnInit(): void {
    this.initParams();
    this.getListPrimaveraProjects();
    this.initInfoProjet();
    this.initListContacts();
    this.getBim360DocumentsMangement();
  }

  initParams() {
    this.params['form'] = ProjetMetadata.ficheAddEditProjet.form.controls;
    this.params['_type'] = this.activatedRoute.snapshot.data.type;
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['pImageAsFile'] = null;
    this.params['pImageAsB64'] = 'assets/images/gallery/no_image.png';

    if (this.activatedRoute.snapshot.queryParams.ac) {
      this._doOpenDialogAddContact({ item: { idProject: this.params['pathParams'].idProjet } });
    }

    this.params['tableListContacts'] = {
      metadata: ProjetMetadata.ficheAddEditProjet['tableListContacts'],
      responsePayload: {
        data: [],
        total: 0
      },
      searchObject: initSearchObject(<SearchObject>{
        pagination: new Pagination(0, 5),
        dataSearch: [new CriteriaSearch('idProject', this.params['pathParams'].idProjet, '=')]
      })
    };

    this.params['tableListBimDocuments'] = [];

    this.params['tableListProjectImages'] = {
      metadata: ProjetMetadata.ficheAddEditProjet.tableListImages,
      responsePayload: {
        data: [],
        total: 0
      },
      listAttachFiles: [] as File[],
      pagination: { limit: 5, offSet: 0 }
    };

    this.params['idProjectPrimavera'] = {
      metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
        label: this.getLabel(17),
        value: 'projId',
        optionLabel: 'title'
      }),
      data: []
    };
  }


  initForm(formData?) {
    const tempForm: UntypedFormGroup = this.formBuilder.group({});
    if (!isEmptyValue(formData)) {
      for (const control of this.params['form']) {
        tempForm.addControl(control.key, new FormControl(formData[control.key], (!isEmptyValue(control.validators) && Array.isArray(control.validators) ? control.validators : [])));
      }
    } else {
      for (const control of this.params['form']) {
        tempForm.addControl(control.key, new FormControl(null, (!isEmptyValue(control.validators) && Array.isArray(control.validators) ? control.validators : [])));
      }
    }
    return tempForm;
  }

  getFormControl(index: number) {
    return this.form.get(this.params['form'][index].key) as UntypedFormControl;
  }

  getLabel(index: number) {
    return this.params['form'][index].label;
  }


  /** manage data functions */



  getListPrimaveraProjects() {
    const so: SearchObject = new SearchObject();
    // so.listCol = ['projId', 'projShortName'];
    // so.sort = new Sort('projId', 'desc nulls last');

    const request: RequestObject = <RequestObject>{
      uri: PROJET_URI.PRIMAVERA_URI.PROJECTS_LIST_DATA,
      params: {
        body: so
      },
      microservice: ConstanteWs._CODE_PRIMAVERA,
      method: ConstanteWs._CODE_POST
    };

    this.sharedService.commonWs(request).subscribe({
      next: (response) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['idProjectPrimavera'].data = response.payload.data.map(item => ({
            ...item,
            title: item.projId + ' - ' + item.projShortName
          }));
        } else {
          console.error(`Error in AddEditProjetComponent/getListPrimaveraProjects, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in AddEditProjetComponent/getListPrimaveraProjects, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  initInfoProjet() {
    if (Object.keys(this.params['pathParams']).includes('idProjet')) {
      const request: RequestObject = <RequestObject>{
        uri: PROJET_URI.BASE_PROJET,
        params: {
          path: [this.params['pathParams'].idProjet]
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_GET
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.params['infoProjet'] = response.payload;
            this.params['pImageAsFile'] = null;
            // this.params['pImageAsB64'] = this.params['infoProjet']['pImage'] || 'assets/images/gallery/no_image.png';
            this.form = this.initForm({
              ...response.payload,
              // rvtSource: !isEmptyValue(response.payload.urn) ? 'fromBIM' : 'fromFile'
              rvtSource: 'fromBIM'
            });
            this.initListProjectMedias(response.payload.dataMedia);
          } else {
            console.error(`Error in DetailProjetD5Component/getInfoProjet, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in DetailProjetD5Component/getInfoProjet, error :: ${error}`);
          this.toast.error();
        }
      });
    } else {
      this.form = this.initForm({ rvtSource: 'fromBIM' });
    }
  }

  initListContacts() {
    if (!isEmptyValue(this.params['pathParams'].idProjet)) {

      const request: RequestObject = <RequestObject>{
        uri: CONTACT_URI.LIST_CONTACT,
        params: {
          body: this.params['tableListContacts'].searchObject
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_POST
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            response.payload.data = response.payload.data.map(item => ({ cImgAsB64: 'assets/images/gallery/default_avatar.png', ...item }));
            this.params.tableListContacts.responsePayload = response.payload;
          } else {
            console.error(`Error in AddEditProjetComponent/getListContacts, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in AddEditProjetComponent/getListContacts, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  initListProjectMedias(mediasList = []) {
    this.params.tableListProjectImages.listAttachFiles = mediasList;
    this.params.tableListProjectImages.listAttachFiles = this.params.tableListProjectImages.listAttachFiles.map(f => ({
      ...f,
      name: f.fileName
    }));
    this.onPaginateTableListImages(this.params.tableListProjectImages.pagination);
  }

  getBim360DocumentsMangement() {
    const request = <RequestObject>{
      uri: PROJET_URI.GET_BIM360_DOCUMENT_MANGEMENT,
      params: {
        query: {
          clientId: environment.forgeProperties.cliendId,
          clientSecret: environment.forgeProperties.client_secret,
          projectId: this.params['pathParams'].idProjet || ""
        }
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_POST
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params.tableListBimDocuments = response.payload
        } else {
          console.error(`Error in TreeViewBimDocManagementComponent/getBim360DocumentsMangement, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in TreeViewBimDocManagementComponent/getBim360DocumentsMangement, error :: ${error}`);
        this.toast.error();
      }
    });
  }


  /** save functions */
  onSave(destination: any) {
    console.assert(isEmptyValue(destination), 'Vérifier destination de la navigation après save');
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.params['isSaveLoading'] = true;
      const formValue = this.form.value;
      // if (isEmptyValue(this.params['selectedUrn'])) {
      //   this.form.setErrors({ 'urn_required': true });
      //   this.params['urnRequiredMsg'] = 'gp.ap.formAddProject.errors.rvt_file_required';
      //   this.toast.error('general.errors.form_invalid');
      //   return;
      // } else {
      //   this.params['urnRequiredMsg'] = '';
      //   this.form.setErrors(null);
      //   formValue['urn'] = this.params['selectedUrn'];
      // }
      console.log('this.treeViewBimDocManagementComponent.checklistSelection', this.treeViewBimDocManagementComponent.checklistSelection.selected);
      formValue['urn'] = this.treeViewBimDocManagementComponent.checklistSelection.selected.map(node => (node.urn));
      console.log('formValue[\'urn\']', formValue['urn']);

      if (Object.keys(this.params['pathParams']).includes('idProjet')) {
        formValue['id'] = this.params['pathParams']['idProjet'];
      }


      const request: RequestObject = <RequestObject>{
        uri: PROJET_URI.BASE_PROJET,
        params: {
          formData: {
            data: formValue,
            filedata: this.params.tableListProjectImages.listAttachFiles
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
              this.toast.success('general.success_save');
              this.getFormControl(0).setErrors(null);
              switch (destination) {
                case ROUTING_TYPES.AP:
                case ROUTING_TYPES.EP:
                  this.router.navigate(['/app/prj/l/d', result.payload.id]);
                  this.params['isSaveLoading'] = false;
                  return;
                case 'add_contact':
                  this.params['isSaveLoading'] = false;
                  this.router.navigate(
                    [
                      '/app/prj/a', result.payload.id
                    ],
                    {
                      queryParams: { ac: true }
                    }
                  );
                  break;
              }
            } else if (result.code == ConstanteWs._CODE_WS_CODE_EXISTS) {
              this.getFormControl(0).setErrors({ 'general.errors.code_already_exist': true });
              this.toast.error('general.errors.code_already_exist');
              this.params['isSaveLoading'] = false;
            } else {
              console.error(`Error in AddEditProjetComponent/onSave, error code :: ${result.code}`);
              this.getFormControl(0).setErrors(null);
              this.toast.error();
              this.params['isSaveLoading'] = false;
            }
          }
        },
        error: (error) => {
          console.error(`Error in AddEditProjetComponent/onSave, error :: ${error}`);
          this.toast.error();
          this.params['isSaveLoading'] = false;
        }
      });
    } else {
      this.toast.error('general.errors.form_invalid');
    }
  }


  /** Add functions */

  onAddTableListImages() {
    // let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    let element: HTMLElement = document.querySelector('.upload-project-images') as HTMLElement;
    element.click();
  }

  private _doOpenDialogAddContact(row?) {
    let metadata = null;
    if (!isEmptyValue(row)) {
      metadata = {
        item: row.item
      };
    }
    this.sharedService
      .openDialog(AddEditContactDialogComponent, metadata)
      .subscribe((response) => {
        if (response) {
          this.initListContacts();
        }
      });
  }

  onAddTableListContacts() {
    if (Object.keys(this.params['pathParams']).includes('idProjet')) {
      this._doOpenDialogAddContact({ item: { idProject: this.params['pathParams'].idProjet } });
    } else {
      this.confirmDialogService
        .confirm(
          '',
          'gp.ap.formAddProject.general.add_contact_projet_required'
        )
        .subscribe((flag) => {
          if (flag) {
            this.onSave('add_contact');
          }
        });
    }
  }


  /** edit functions */
  onEditTableListContacts(row) {
    this._doOpenDialogAddContact(row);
  }


  /** delete functions */

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
          this.params.tableListProjectImages.listAttachFiles.splice(row.index, 1);
          this.onPaginateTableListImages({
            limit: 5,
            offSet: 0
          }, this.params.tableListProjectImages.listAttachFiles);
        }

      }
    });
  }

  onDeleteTableListContacts(row) {
    this.confirmDialogService.confirm('', 'general.delete_confirmation').subscribe(flag => {
      if (flag) {
        const request: RequestObject = <RequestObject>{
          uri: CONTACT_URI.BASE_CONTACT,
          params: {
            path: [row.item.id]
          },
          microservice: ConstanteWs._CODE_ADMINISTRATION,
          method: ConstanteWs._CODE_DELETE
        };
        this.sharedService.commonWs(request).subscribe({
          next: (response: ResponseObject) => {
            if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
              this.toast.success('general.success_delete');
              this.initListContacts();
            } else {
              console.error(`Error in AddEditProjetComponent/onDeleteTableListContacts, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in AddEditProjetComponent/onDeleteTableListContacts, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }

  onDeleteTableExecutiveReport(row) {
    this.confirmDialogService.confirm('', 'general.delete_confirmation').subscribe(flag => {
      if (flag) {
        const request: RequestObject = <RequestObject>{
          uri: EXECUTIVE_REPORTS.BASE_EXECUTIVE_REPORTS,
          params: {
            path: [row.item.id]
          },
          microservice: ConstanteWs._CODE_ADMINISTRATION,
          method: ConstanteWs._CODE_DELETE
        };
        this.sharedService.commonWs(request).subscribe({
          next: (response: ResponseObject) => {
            if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
              this.toast.success('general.success_delete');
              this.initListContacts();
            } else {
              console.error(`Error in AddEditProjetComponent/onDeleteTableExecutiveReport, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in AddEditProjetComponent/onDeleteTableExecutiveReport, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }

  /** sort functions */
  onSortTableListContacts(sort: Sort) {
    this.params['tableListContacts'].searchObject.sort = sort;
    this.initListContacts();
  }

  onSortTableListImages(sort: Sort) {
    this.onPaginateTableListImages({
      limit: 5,
      offSet: 0
    }, datatableSorting(this.params.tableListProjectImages.listAttachFiles, sort));
  }


  /** pagination functions */
  onPaginateTableListContacts(pagination: Pagination) {
    this.params['tableListContacts'].searchObject.sort = null;
    this.params['tableListContacts'].searchObject.pagination = pagination;
    this.initListContacts();
  }

  onPaginateTableListImages(pagination: Pagination, dataList = this.params.tableListProjectImages.listAttachFiles) {
    if (dataList.length) {
      this.params.tableListProjectImages.pagination = pagination;
      const start = pagination.offSet * pagination.limit;
      const end = start + pagination.limit;
      this.params.tableListProjectImages.responsePayload = {
        data: [...dataList.slice(start, end)],
        total: dataList.length
      };
      if (this.params.tableListProjectImages.responsePayload.data.length == 0) {
        this.params.tableListProjectImages.pagination.offSet--;
        if (this.projectImagesDatatable.paginatorComponent.paginator.hasPreviousPage()) {
          this.projectImagesDatatable.paginatorComponent.paginator.previousPage();
        }
        this.onPaginateTableListImages(this.params.tableListProjectImages.pagination);
      }
    } else {
      this.params.tableListProjectImages.responsePayload = {
        data: [],
        total: 0
      };
    }
  }

  /** delete functions */

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

  /** onOpenIn functions */

  onOpenInTableListBimHubs(row) {
    window.open(row.item.webViewLink, '_blank').focus();
  }

  onOpenInTableListBimProjet(row) {
    window.open(row.item.webViewLink, '_blank').focus();
  }

  onOpenInTableListBimDocs(row) {
    window.open(row.item.webViewLink, '_blank').focus();
  }

  openImageTableListImages(row) {
    const metadata = {
      listMedias: this.params.tableListProjectImages.listAttachFiles,
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

  /** oher functions */


  onFileSelected(event) {
    const file = event.target.files[0];
    if (file.size == 0) {
      this.toast.error('gp.ap.formAddProject.errors.file_invalid_size');
      return;
    }
    if (file.name.match(/\.([^\.]+)$/)[1].toLowerCase() == '.rvt') {
      this.toast.error('gp.ap.formAddProject.errors.rvt_file_required');
      return;
    }
    this.params['file'] = file;
  }

  onProjectImagesSelected(event) {
    const filesList: FileList = event.target.files;
    const tempListFiles = [] as File[];

    for (let i = 0; i < filesList.length; i++) {
      tempListFiles.push(filesList.item(i));
    }
    for (const file of tempListFiles) {
      if (file.size == 0) {
        this.toast.error('gp.ap.formAddProject.errors.file_invalid_size');
        return;
      }
      if (file.type.match(/image\//gm)[0] != 'image/') {
        this.toast.error('gp.ap.formAddProject.errors.img_file_required');
        return;
      }
    }
    this.params.tableListProjectImages.listAttachFiles.push(...tempListFiles);
    this.onPaginateTableListImages(this.params.tableListProjectImages.pagination);
  }

  async onPrjImgSelected(event) {
    const file = event.target.files[0];
    if (file.size == 0) {
      this.toast.error('gp.ap.formAddProject.errors.file_invalid_size');
      return;
    }
    if (!['jpg', 'jpeg', 'png'].includes(file.name.match(/\.([^\.]+)$/)[1].toLowerCase())) {
      this.toast.error('gp.ap.formAddProject.errors.img_file_required');
      return;
    }
    this.params['pImageAsFile'] = file;
    const b64PrjImg = await fileToBase64(file);
    if (!isEmptyValue(b64PrjImg)) {
      this.params['pImageAsB64'] = b64PrjImg;
    } else {
      this.toast.error('gp.ap.formAddProject.errors.fail_loading_img');
    }
  }


  onProjectDatesChange(date, ourCase) {
    if (ourCase === 'commencementDate') {
      if (this.getFormControl(13).value) {
        const diff = moment(this.getFormControl(13).value).diff(
          date.value.utc(),
          'years',
          true
        );
        if (Number(diff)) {
          // this.getFormControl(14).setValue(diff.toFixed(2));
          this.getFormControl(14).setValue(diff);
        }
      }
    } else if (ourCase === 'projectCompletion') {
      if (this.getFormControl(12).value) {
        const diff = date.value
          .utc()
          .diff(this.getFormControl(12).value, 'days', true);
        if (Number(diff)) {
          // this.getFormControl(14).setValue(diff.toFixed(2));
          this.getFormControl(14).setValue(diff);
        }
      }
    }
  }

  onProjectDurationChange(value) {
    if (Number(value)) {
      // value = Number.parseFloat(value).toFixed(2);
      value = Number.parseFloat(value);
      this.getFormControl(14).setValue(value);
      if (this.getFormControl(12).value) {
        this.getFormControl(13).setValue(
          moment(this.getFormControl(12).value).add('days', value)
        );
      }
    }
  }

  handleProjectImageChnage(key: string) {
    if (key == 'deleteImg') {
      this.params['pImageAsFile'] = null;
      this.params['pImageAsB64'] = 'assets/images/gallery/no_image.png';
    }
  }


}
