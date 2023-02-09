import { Component, OnInit } from '@angular/core';
import { initSearchObject, isEmptyValue, onAction } from '@app/shared/tools';
import { Location } from '@angular/common';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaSearch, Pagination, RequestObject, SearchObject, Sort } from '@shared/models';
import { PhotoReportsMetadata } from '@privateLayout/shared/constantes/media/media-metadata';
import { DOCUMENT_URI, PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { AjoutDocDialogComponent } from '@shared/widgets';
import { COMMON_GED_URI } from '@privateLayout/shared/constantes/common/common-uri';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
import { saveAs } from 'file-saver';
import { DocumentsMetadata } from '@privateLayout/shared/constantes/documents/documents-metadata';

@Component({
  selector: 'app-detail-projet-media',
  templateUrl: './detail-documents-projet.component.html',
  styleUrls: ['./detail-documents-projet.component.css']
})
export class DetailDocumentsProjetComponent implements OnInit {
  params: any = {};
  onAction = onAction;


  constructor(
    private _location: Location,
    private sharedService: SharedService,
    private toast: ToastService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initParams();
  }

  ngOnInit(): void {
    this.getInfoProjet();
    this.getListDocuments();
  }


  /** init functions */
  initParams() {
    this.params['_type'] = this.activatedRoute.snapshot.data.type;
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['infoProjet'] = {
      data: [],
      metadata: DocumentsMetadata.ficheInfoProjet
    };
    this.params['documentsList'] = {
      metadata: DocumentsMetadata.tableListDocuments(this.params['_type'] + '-title'),
      responsePayload: {
        data: [],
        total: 0
      },
      searchObject: initSearchObject(<SearchObject>{
        pagination: new Pagination(0, 10),
        dataSearch: [
          new CriteriaSearch('code', this.params['_type'], '='),
          new CriteriaSearch('idProject', this.params['pathParams'].idProjet, '=')
        ],
        sort: new Sort('id', 'desc nulls last')
      })
    };
  }

  /** init data functions */

  getInfoProjet() {
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
          this.params['infoProjet'].data = response.payload;
        } else {
          console.error(`Error in DetailDocumentsProjetComponent/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailDocumentsProjetComponent/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  getListDocuments() {
    const request: RequestObject = <RequestObject>{
      uri: DOCUMENT_URI.LIST_DOCUMENT,
      params: {
        body: this.params.documentsList.searchObject
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_POST
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params.documentsList.responsePayload = response.payload;
        } else {
          console.error(`Error in DetailDocumentsProjetComponent/getListDocuments, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailDocumentsProjetComponent/getListDocuments, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  onSearch($event) {
    this.params['documentsList'].searchObject.pagination.offSet = 0;
    this.params['documentsList'].searchObject.pagination.limit = 10;
    this.params['documentsList'].searchObject['dataSearch'] = [
      new CriteriaSearch('code', this.params['_type'], '='),
      new CriteriaSearch('idProject', this.params['pathParams'].idProjet, '=')
    ];
    this.params['documentsList'].searchObject.dataSearch.push(...($event || []));
    this.getListDocuments();
  }

  /** pagination functions */
  onPaginateTableListDocuments(pagination: Pagination) {
    this.params['documentsList'].searchObject.pagination = pagination;
    this.getListDocuments();
  }

  /** sort functions */
  onSortTableListDocuments(sort: Sort) {
    this.params['documentsList'].searchObject.sort = sort;
    this.getListDocuments();
  }

  /** add/edit functions */
  private _doOpenAddEditMediaDialog(row?) {
    let metadata = {
      title: `media.lc.dialogAddEditCamera.titleAdd`,
      type: this.params['_type'],
      item: {code: this.params['_type'], idProjet: this.params['pathParams'].idProjet, }
    };
    if (!isEmptyValue(row)) {
      metadata['title'] = `media.lc.dialogAddEditCamera.titleEdit`;
      metadata['item'] = row.item;
    }
    this.sharedService
      .openDialog(AjoutDocDialogComponent, metadata)
      .subscribe((response) => {
        if (response) {
          this.getListDocuments();
        }
      });
  }

  onAddTableListDocuments(row) {
    this._doOpenAddEditMediaDialog();
  }

  onEditTableListDocuments(row) {
      this._doOpenAddEditMediaDialog(row);
  }

  /** delete functions */
  onDeleteTableListDocuments(row) {
    this.confirmDialogService.confirm('', 'general.delete_confirmation').subscribe((flag) => {
      if (flag) {
        const request: RequestObject = <RequestObject>{
          uri: DOCUMENT_URI.BASE_DOCUMENT,
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
              this.getListDocuments();
            } else {
              console.error(`Error in DetailDocumentsProjetComponent/onDeleteTableListDocuments, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in DetailDocumentsProjetComponent/onDeleteTableListDocuments, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }

  /** download functions */

  onDownloadTableListDocuments(row) {
    const request: RequestObject = <RequestObject>{
      uri: COMMON_GED_URI.DOWNLOAD_FOLDER,
      params: {
        query: {
          nodeRef: row.item.idNodeRef
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
        saveAs(blob, row.item.nomFichier + '.zip');
        this.toast.success('general.success_download');
      },
      error: (error) => {
        console.error(`Error in DetailDocumentsProjetComponent/onDownloadTableListDocuments, error :: ${error}`);
        this.toast.error();
      }
    });
  }


  /** other functions */

  onPrecedent() {
    this._location.back();
  }

}
