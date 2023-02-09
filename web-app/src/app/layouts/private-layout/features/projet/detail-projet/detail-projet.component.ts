import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ToastService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import {  ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { CriteriaSearch, Pagination, RequestObject, SearchObject, Sort } from '@shared/models';
import { CONTACT_URI, PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { initSearchObject, isEmptyValue, onAction, serializeBase64 } from '@app/shared/tools';
import { ViewerService } from '@privateLayout/shared/services/viewer.service';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  params: any = {};
  onAction = onAction;
  @ViewChild('briefConntainer') briefConntainerVar: HTMLElement;



  constructor(
    private sharedService: SharedService,
    private toast: ToastService,
    private router: Router,
    private viewerService: ViewerService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initParams();
    this.getInfoProjet();
    this.initListContacts();
  }

  AfterViewInit() {
    this.params['projectImgDim'] = this.briefConntainerVar.getBoundingClientRect()

  }


  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['baseInformation'] = {
      data: [],
      metadata: ProjetMetadata.ficheDetailProjet.ficheBaseInoProjet
    };
    this.params['infoProjet'] = {
      data: [],
      metadata: ProjetMetadata.ficheDetailProjet.ficheBriefInfoProjet
    };
    this.params['tableListViewContacts'] = {
      metadata: ProjetMetadata.ficheDetailProjet.tableListViewContacts,
      responsePayload: {
        data: [],
        total: 0
      },
      searchObject: initSearchObject(<SearchObject>{
        pagination: new Pagination(0, 5),
        dataSearch: [new CriteriaSearch("idProject", this.params['pathParams'].idProjet, "=")]
      })
    };

  }

  getInfoProjet() {
    // project/{id}
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
          this.viewerService.initNativeViewer(document.getElementById('MyViewerDiv'), this.params['infoProjet'].data.urn);
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

  initListContacts() {
    if (!isEmptyValue(this.params['pathParams'].idProjet)) {
      const request: RequestObject = <RequestObject>{
        uri: CONTACT_URI.LIST_CONTACT,
        params: {
          body: this.params.tableListViewContacts.searchObject
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_POST
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            response.payload.data = response.payload.data.map(item=>({cImgAsB64: 'assets/images/gallery/default_avatar.png',...item}))
            this.params.tableListViewContacts.responsePayload = response.payload;
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

  /** sort functions */
  onSortTableListContacts(sort: Sort) {
    this.params.tableListViewContacts.searchObject.sort = sort;
    this.initListContacts();
  }

  /** pagination functions */
  onPaginateTableListContacts(pagination: Pagination) {
    this.params.tableListViewContacts.searchObject.sort = null;
    this.params.tableListViewContacts.searchObject.pagination = pagination;
    this.initListContacts();
  }

  goToListe() {
    this.router.navigate(['/app/prj/l']);
  }
}
