import { Component, OnInit } from '@angular/core';
import { initSearchObject, isEmptyValue, onAction } from '@app/shared/tools';
import { Location } from '@angular/common';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { AppTranslateService, ConfirmDialogService, ToastService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaSearch, Pagination, RequestObject, SearchObject, Sort } from '@shared/models';
import { PhotoReportsMetadata } from '@privateLayout/shared/constantes/media/media-metadata';
import { DOCUMENT_URI, PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { AjoutDocDialogComponent, DialogGalleryMediaComponent } from '@shared/widgets';
import { COMMON_GED_URI } from '@privateLayout/shared/constantes/common/common-uri';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';

@Component({
  selector: 'app-detail-projet-media',
  templateUrl: './detail-projet-media.component.html',
  styleUrls: ['./detail-projet-media.component.css']
})
export class DetailProjetMediaComponent implements OnInit {
  params: any = {};
  onAction = onAction;


  constructor(
    private _location: Location,
    private sharedService: SharedService,
    private toast: ToastService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private appTranslateService: AppTranslateService
  ) {
    this.initParams();
  }

  ngOnInit(): void {
    this.getInfoProjet();
    this.getListMedia();
  }


  /** init functions */
  initParams() {
    this.params['_type'] = this.activatedRoute.snapshot.data.type;
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['infoProjet'] = {
      data: [],
      metadata: PhotoReportsMetadata.ficheInfoProjet
    };
    this.params['mediaList'] = {
      metadata: PhotoReportsMetadata.tableListMedias(this.params['_type'] + '-title'),
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
          console.error(`Error in DetailProjetMediaComponent/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailProjetMediaComponent/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  getListMedia() {
    const request: RequestObject = <RequestObject>{
      uri: DOCUMENT_URI.LIST_DOCUMENT,
      params: {
        body: this.params.mediaList.searchObject
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_POST
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params.mediaList.responsePayload = response.payload;
        } else {
          console.error(`Error in DetailProjetMediaComponent/getListMedia, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailProjetMediaComponent/getListMedia, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  onSearch($event) {
    this.params['mediaList'].searchObject.pagination.offSet = 0;
    this.params['mediaList'].searchObject.pagination.limit = 10;
    this.params['mediaList'].searchObject['dataSearch'] = [
      new CriteriaSearch('code', this.params['_type'], '='),
      new CriteriaSearch('idProject', this.params['pathParams'].idProjet, '=')
    ];
    this.params['mediaList'].searchObject.dataSearch.push(...($event || []));
    this.getListMedia();
  }

  /** pagination functions */
  onPaginateTableListMedia(pagination: Pagination) {
    this.params['mediaList'].searchObject.pagination = pagination;
    this.getListMedia();
  }

  /** sort functions */
  onSortTableListMedia(sort: Sort) {
    this.params['mediaList'].searchObject.sort = sort;
    this.getListMedia();
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
          this.getListMedia();
        }
      });
  }

  onAddTableListMedia(row) {
    this._doOpenAddEditMediaDialog();
  }

  onEditTableListMedia(row) {
      this._doOpenAddEditMediaDialog(row);
  }

  /** delete functions */
  onDeleteTableListMedia(row) {
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
              this.getListMedia();
            } else {
              console.error(`Error in DetailProjetMediaComponent/onDeleteTableListMedia, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in DetailProjetMediaComponent/onDeleteTableListMedia, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }

  /** openImage functions */
  openImageTableListMedia(row) {
    const request: RequestObject = <RequestObject>{
      uri: COMMON_GED_URI.FILE_WITH_B64,
      params: {
        query: {
          nodeRef : row.item.idNodeRef
        }
      },
      microservice: ConstanteWs._CODE_GED,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        // if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
        const type = ()=>{
          switch (this.params['_type']) {
            case ROUTING_TYPES.VR:
              return 'video/mp4'
            case ROUTING_TYPES.PR:
              return 'image/png'
          }
        }
          const metadata = {
            listMedias: response,
            type: type(),
            selectedIdx: 0
          };
          this.dialog.open(DialogGalleryMediaComponent, {
            disableClose: true,
            height: '100vh',
            width: '100vw',
            maxWidth: '100vw',
            direction: this.appTranslateService.getDir(),
            autoFocus: true,
            data: metadata
          }).afterClosed().pipe(map((response) => response.data));
        // } else {
        //   console.error(`Error in DetailProjetMediaComponent/openImageTableListMedia, error code :: ${response.code}`);
        //   this.toast.error();
        // }
      },
      error: (error) => {
        console.error(`Error in DetailProjetMediaComponent/openImageTableListMedia, error :: ${error}`);
        this.toast.error();
      }
    });

  }
  /** download functions */

  onDownloadTableListMedia(row) {
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
        console.error(`Error in DetailProjetMediaComponent/onDownloadTableListMedia, error :: ${error}`);
        this.toast.error();
      }
    });
  }


  /** other functions */

  onPrecedent() {
    this._location.back();
  }

}
