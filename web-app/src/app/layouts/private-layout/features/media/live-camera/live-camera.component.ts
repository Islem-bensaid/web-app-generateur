import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { initSearchObject, isEmptyValue, onAction } from '@shared/tools';
import { CriteriaSearch, Pagination, RequestObject, SearchObject, Sort } from '@shared/models';
import { LiveCameraMetadata, PhotoReportsMetadata } from '@privateLayout/shared/constantes/media/media-metadata';
import { CONTACT_URI, PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { MEDIA_URI } from '@privateLayout/shared/constantes/media/media-uri';
import {
  AddEditContactDialogComponent
} from '@privateLayout/features/projet/add-edit-projet/add-edit-contact-dialog/add-edit-contact-dialog.component';
import {
  DialogAddEditCameraComponent
} from '@privateLayout/features/media/live-camera/dialog-add-edit-camera/dialog-add-edit-camera.component';
import { ResponseObject } from '@shared/models/ResponseObject';

@Component({
  selector: 'app-live-camera',
  templateUrl: './live-camera.component.html',
  styleUrls: ['./live-camera.component.css']
})
export class LiveCameraComponent implements OnInit {

  onAction = onAction;
  params: any = {};
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private toast: ToastService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.initParams();
  }

  ngOnInit(): void {
    this.getInfoProjet();
    this.initDataList();
  }

  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['infoProjet'] = {
      data: [],
      metadata: LiveCameraMetadata.ficheInfoProjet
    };
    this.params['liveCameraList'] = {
      metadata: LiveCameraMetadata.liveCameraList,
      responsePayload: {
        data: [],
        total: 0
      },
      searchObject: initSearchObject(<SearchObject>{
        pagination: new Pagination(0, 10),
        dataSearch: [
          new CriteriaSearch('idProjet', this.params['pathParams'].idProjet, '=')
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
          console.error(`Error in LiveCameraComponent/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in LiveCameraComponent/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }


  initDataList() {
    const request: RequestObject = <RequestObject>{
      uri: MEDIA_URI.LIVE_CAMERA_URI.LIVE_CAMERA_DATA,
      params: {
        body: this.params['liveCameraList'].searchObject
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_POST
    };

    this.sharedService.commonWs(request).subscribe({
      next: (response) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['liveCameraList'].responsePayload = response.payload;
        } else {
          console.error(`Error in LiveCameraComponent/initDataList, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in LiveCameraComponent/initDataList, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  onSearch($event) {
    console.log('$event', $event);
    this.params['liveCameraList'].searchObject.pagination.offSet = 0;
    this.params['liveCameraList'].searchObject.pagination.limit = 10;
    this.params['mediaList'].searchObject['dataSearch'] = [
      new CriteriaSearch('idProjet', this.params['pathParams'].idProjet, '=')
    ];
    this.params['liveCameraList'].searchObject.dataSearch.push(...($event || []));
    this.initDataList();
  }

  /** pagination functions */
  onPaginateTableOfLiveCameras(pagination: Pagination) {
    this.params['liveCameraList'].searchObject.pagination = pagination;
    this.initDataList();
  }

  /** sort functions */
  onSortTableOfLiveCameras(sort: Sort) {
    this.params['liveCameraList'].searchObject.sort = sort;
    this.initDataList();
  }

  /** add/edit functions */
  private _doOpenDialogCamera(row?) {
    let metadata = {
      title: `media.pr/vr.details.dialogListMedia.${this.params['_type']}-add-title`,
      item: {idProjet: this.params['pathParams'].idProjet, }
    };
    if (!isEmptyValue(row)) {
      metadata['item'] = row.item;
    }
    this.sharedService
      .openDialog(DialogAddEditCameraComponent, metadata, '45%')
      .subscribe((response) => {
        if (response) {
          this.initDataList();
        }
      });
  }
  /** add functions */
  onAddTableOfLiveCameras() {
    this._doOpenDialogCamera();
  }

  /** edit functions */
  onEditTableOfLiveCameras(row) {
    this._doOpenDialogCamera(row);
  }

  /** delete functions */
  onDeleteTableOfLiveCameras(row) {
    this.confirmDialogService.confirm('', 'general.delete_confirmation').subscribe(flag => {
      if (flag) {
        const request: RequestObject = <RequestObject>{
          uri: MEDIA_URI.LIVE_CAMERA_URI.LIVE_CAMERA_BASE,
          params: {
            path: [row.item.id]
          },
          microservice: ConstanteWs._CODE_ADMINISTRATION,
          method: ConstanteWs._CODE_DELETE
        };
        this.sharedService.commonWs(request).subscribe({
          next: (response: ResponseObject) => {
            if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
              this.toast.success("general.success_delete");
              this.initDataList();
            } else {
              console.error(`Error in LiveCameraComponent/onDeleteTableListContacts, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in LiveCameraComponent/onDeleteTableListContacts, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }


  /** open camera functions */
  openCameraTableOfLiveCameras(row) {
    window.open(row.item.url, '_blank');
  }
}
