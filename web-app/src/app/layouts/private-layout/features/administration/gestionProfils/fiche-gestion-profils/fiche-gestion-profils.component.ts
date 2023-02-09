import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, RequestObject, SearchObject, Sort } from '@shared/models';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { ADMINISTRATION_URI } from '@privateLayout/shared/constantes';
import { ToastService } from '@shared/services';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { Router } from '@angular/router';
import { PaginatorComponent } from '@shared/widgets';
import {
  TableGestionProfilsComponent
} from '@privateLayout/features/administration/gestionProfils/fiche-gestion-profils/table-gestion-profils/table-gestion-profils.component';

@Component({
  selector: 'app-fiche-gestion-profils',
  templateUrl: './fiche-gestion-profils.component.html',
  styleUrls: ['./fiche-gestion-profils.component.css']
})
export class FicheGestionProfilsComponent implements OnInit {

  @ViewChild(PaginatorComponent) p: PaginatorComponent;
  @ViewChild('table') table: TableGestionProfilsComponent;
  searchObject: SearchObject;
  responsePayload: any = {};
  editMod: any;

  constructor(
    private toast: ToastService,
    private sharedService: SharedService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.searchObject = this.initSearchObject();
    this.initDataList();
  }

  initSearchObject() {
    const searchObject = new SearchObject();
    searchObject.pagination = new Pagination(0, 10);
    searchObject.sort = new Sort('id', 'asc nulls last');
    searchObject.listCol = ['id', 'code', 'role', 'dtAjout', 'libelleAr', 'libelleFr', 'libelleEn', 'ordre'];
    return searchObject;
  }


  initDataList() {
    const request: RequestObject = <RequestObject>{
      uri: ADMINISTRATION_URI.GESTION_PROFILS.DATA,
      params: {
        body: this.searchObject
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_POST
    };
    this.responsePayload['isLoading'] = true;
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.responsePayload = response.payload;
          this.responsePayload['isLoading'] = false;
        } else {
          console.error(`Error in FicheGestionProfilsComponent/initData, error code :: ${response.code}`);
          this.toast.error();
          this.responsePayload['isLoading'] = false;
        }
      },
      error: (error) => {
        console.error(`Error in FicheGestionProfilsComponent/initData, error :: ${error}`);
        this.toast.error();
        this.responsePayload['isLoading'] = false;
      }
    });
  }

  initDataP(searchObject: SearchObject) {
    if (this.editMod) {
      const request: RequestObject = <RequestObject>{
        uri: ADMINISTRATION_URI.GESTION_PROFILS.ADM_USER_EDIT,
        params: {
          query: {
            lim: searchObject.pagination.limit,
            page: searchObject.pagination.offSet
          }
        },

        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_GET
      };
      // this.responsePayload['isLoading'] = true;
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.responsePayload = {
              data: response.payload,
              count: response.payload.length
            };


            console.log('responsePayload', this.responsePayload);
          } else {
            console.error(`Error in FicheGestionProfilsComponent/initData, error code :: ${response.code}`);
            this.toast.error();
            //this.responsePayload['isLoading'] = false
          }
        },
        error: (error) => {
          console.error(`Error in FicheGestionProfilsComponent/initData, error :: ${error}`);
          this.toast.error();
          // this.responsePayload['isLoading'] = false
        }
      });


    }
  }


  onSearch($event) {
    this.searchObject.pagination.offSet = 0;
    this.searchObject.pagination.limit = 10;
    this.table.paginatorComponent.paginator.pageIndex = 0;
    this.searchObject.dataSearch = [];
    this.searchObject.dataSearch = $event;
    this.initDataList();
    this.initDataP(this.searchObject);

  }

  onPaginate(pagination: Pagination) {
    this.searchObject.pagination = pagination;
    this.initDataList();
    this.initDataP(this.searchObject);

  }

  onSort(sort: any) {
    this.searchObject.sort = sort;
    this.onSearch(this.searchObject.dataSearch);
  }
}
