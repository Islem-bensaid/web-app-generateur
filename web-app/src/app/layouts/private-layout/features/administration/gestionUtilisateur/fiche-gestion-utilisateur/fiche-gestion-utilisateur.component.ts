import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatorComponent } from '@shared/widgets';
import { Pagination, RequestObject, SearchObject, Sort } from '@shared/models';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { Router } from '@angular/router';
import { ADMINISTRATION_URI } from '@privateLayout/shared/constantes/administration/administration-uri-index';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import {
  TableFicheUtilisateurComponent
} from '@privateLayout/features/administration/gestionUtilisateur/fiche-gestion-utilisateur/table-fiche-utilisateur/table-fiche-utilisateur.component';

@Component({
  selector: 'app-fiche-gestion-utilisateur',
  templateUrl: './fiche-gestion-utilisateur.component.html',
  styleUrls: ['./fiche-gestion-utilisateur.component.css']
})
export class FicheGestionUtilisateurComponent implements OnInit {


  @ViewChild('table') table: TableFicheUtilisateurComponent;
  searchObject: SearchObject;
  responsePayload: any = {};

  constructor(
    private toast: ToastService,
    private sharedService: SharedService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
  ) {
  }

  ngOnInit(): void {
    this.searchObject = this.initSearchObject();
    this.initDataList();
  }

  initSearchObject() {
    const searchObject = new SearchObject();
    searchObject.pagination = new Pagination(0, 10);  
    searchObject.sort = new Sort('dt_ajout', 'desc nulls last');
    searchObject.listCol = ['login', 'nom', 'prenom', 'dt_ajout', 'isActifFr', 'isActifAr', 'isActifEn'];
    return searchObject;
  }


  initDataList() {

    const request: RequestObject = <RequestObject>{
      uri: ADMINISTRATION_URI.GESTION_USER.DATA,
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
          for (let i=0 ; i <this.responsePayload.data.length;i++){
              this.responsePayload.data[i]['nom']= this.responsePayload.data[i]['nom'] +' '+ this.responsePayload.data[i]['prenom']
          }
          this.responsePayload['isLoading'] = false;
        } else {
          console.error(`Error in FicheGestionUtilisateurComponent/initData, error code :: ${response.code}`);
          this.toast.error();
          this.responsePayload['isLoading'] = false;
        }
      },
      error: (error) => {
        console.error(`Error in FicheGestionUtilisateurComponent/initData, error :: ${error}`);
        this.toast.error();
        this.responsePayload['isLoading'] = false;
      }
    });
  }

  onSearch($event) {
    this.searchObject.pagination.offSet = 0;
    this.searchObject.pagination.limit = 10;
    this.table.paginatorComponent.paginator.pageIndex = 0;
    this.searchObject.dataSearch = [];
    this.searchObject.dataSearch = $event;
    this.initDataList();
  }

  onPaginate(pagination: Pagination) {
    this.searchObject.pagination = pagination;
    this.initDataList();
  }

  onSort(sort: any) {
    this.searchObject.sort = sort;
    this.onSearch(this.searchObject.dataSearch);
  }


  deleteUser(user) {
    this.confirmDialogService.confirm('', 'general.delete_confirmation').subscribe((flag) => {
      if (flag) {
        const request: RequestObject = <RequestObject>{

          uri: ADMINISTRATION_URI.GESTION_USER.BASE_USER,
          params: {
            path: [user.id]
          },
          microservice: ConstanteWs._CODE_ADMINISTRATION,
          method: ConstanteWs._CODE_DELETE
        };
        this.sharedService.commonWs(request).subscribe({
          next: (response: ResponseObject) => {
            if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
              this.toast.success('general.success_delete');
            } else {
              console.error(`Error in FicheGestionUtilisateurComponent/deleteUser, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in FicheGestionUtilisateurComponent/deleteUser, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }
}
