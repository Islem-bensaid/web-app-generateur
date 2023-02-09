import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CriteriaSearch, Pagination, RequestObject, SearchObject, Sort } from '@shared/models';
import { DOCUMENT_URI, PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { initSearchObject, isEmptyValue, onAction } from '@shared/tools';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { AjoutDocDialogComponent } from '@shared/widgets';
import { saveAs } from 'file-saver';
import { COMMON_GED_URI } from '@privateLayout/shared/constantes/common/common-uri';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
import { COMMON_METADATA } from '@shared/constantes/CommonMetadata';
import { PhotoReportsMetadata } from '@privateLayout/shared/constantes/media/media-metadata';

@Component({
  selector: 'app-detail-media-progress',
  templateUrl: './detail-media-progress.component.html',
  styleUrls: ['./detail-media-progress.component.css']
})
export class DetailMediaProgressComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
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
  }

  ngOnInit(): void {
    this.initParams();
    this.getInfoProjet();
    this.getListMedia('images');
    this.getListMedia('videos');
  }

  /** init functions */
  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['mediaTypesList'] = {
      all: COMMON_METADATA.dialogAddDoc.mediaTypesList
    };
    COMMON_METADATA.dialogAddDoc.mediaTypesList.forEach(m => {
      if (Object.keys(this.params['mediaTypesList']).includes(m['type'])) {
        this.params['mediaTypesList'][m['type']].push(m.code);
      } else {
        this.params['mediaTypesList'][m['type']] = [m.code];
      }
    });

    this.params['infoProjet'] = {
      data: [],
      metadata: PhotoReportsMetadata.ficheInfoProjet
    };

    for (const media of COMMON_METADATA.dialogAddDoc.mediaTypesList.filter(m => m['type'] == 'datatable')) {
      this.params[media.code + 'List'] = {
        metadata: PhotoReportsMetadata.tableListMedias(),
        responsePayload: {
          data: [],
          total: 0
        },
        searchObject: initSearchObject(<SearchObject>{
          pagination: new Pagination(0, 5),
          sort: new Sort('id', 'desc nulls last')
        })
      };
    }

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
          this.params['infoProjet'].data['pImageAsB64'] ||= 'assets/images/gallery/project-Image.png';
        } else {
          console.error(`Error in DetailProjetComponent/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailProjetComponent/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  getListMedia(mediaType) {
    this.params[mediaType + 'List'].searchObject.dataSearch.push(new CriteriaSearch('code', mediaType, 'upper_like'));
    this.params[mediaType + 'List'].searchObject.dataSearch.push(new CriteriaSearch('idProjet', this.params['pathParams'].idProjet, '='));
    const request: RequestObject = <RequestObject>{
      uri: DOCUMENT_URI.LIST_DOCUMENT,
      params: {
        body: this.params[mediaType + 'List'].searchObject
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_POST
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params[mediaType + 'List'].responsePayload = response.payload;
        } else {
          console.error(`Error in getListMedia/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in getListMedia/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  /** search functions */

  onSearch($event: Partial<any>) {
    let type = '';
    if (this.stepper.selectedIndex == 0) {
      type = 'images';
      this.getListMedia('images');
    } else if (this.stepper.selectedIndex == 1) {
      type = 'videos';
    }


    this.params[type + 'List'].searchObject.pagination.offSet = 0;
    this.params[type + 'List'].searchObject.pagination.limit = 10;
    this.params[type + 'List'].searchObject.dataSearch = $event;
    this.getListMedia(type);

  }

  /** other functions */

  onPrecedent() {
    this._location.back();
  }

  private _doOpenAddDocDialog(row?) {
    let metadata = null;
    if (!isEmptyValue(row)) {
      metadata = {
        item: row.item
      };
    }
    this.sharedService
      .openDialog(AjoutDocDialogComponent, metadata)
      .subscribe((response) => {
        if (response) {
          console.log('response', response);
          this.getListMedia(response.payload.code.toLowerCase());
          if (response.payload.code.toLowerCase() == 'images') {
            this.stepper.selectedIndex = 0;
          } else if (response.payload.code.toLowerCase() == 'videos') {
            this.stepper.selectedIndex = 1;
          } else if (response.payload.code.toLowerCase() == 'files') {
            this.stepper.selectedIndex = 2;
          }
        }
      });
  }

  onAddMedia() {
    this._doOpenAddDocDialog({ item: { idProjet: this.params['pathParams'].idProjet } });
  }

  onEditTableListMedia(row) {
    if (row) {
      this._doOpenAddDocDialog(row.item);
    }
  }

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
              this.getListMedia(row.item.code.toLowerCase());
            } else {
              console.error(`Error in DetailMediaProgressComponent/onDeleteTableListMedia, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in DetailMediaProgressComponent/onDeleteTableListMedia, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }

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
        console.error(`Error in DetailMediaProgressComponent/onDownloadTableListMedia, error :: ${error}`);
        this.toast.error();
      }
    });
  }
}
