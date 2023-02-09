import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Pagination, RequestObject, SearchObject, Sort} from "@shared/models";
import {ToastService} from "@shared/services";
import {SharedService} from "@shared/services/sharedWs/shared.service";
import {Router} from "@angular/router";
import {ADMINISTRATION_URI} from "@privateLayout/shared/constantes/administration/administration-uri-index";
import {ConstanteWs} from "@shared/constantes/ConstanteWs";
import {ResponseObject} from "@shared/models/ResponseObject";
import {PaginatorComponent} from "@shared/widgets";
import {
  TableTracageDesDonnesComponent
} from "@privateLayout/features/administration/TracageDesDonnees/fiche-tracage-des-donnes/table-tracage-des-donnes/table-tracage-des-donnes.component";

@Component({
  selector: 'app-fiche-tracage-des-donnes',
  templateUrl: './fiche-tracage-des-donnes.component.html',
  styleUrls: ['./fiche-tracage-des-donnes.component.css']
})
export class FicheTracageDesDonnesComponent implements OnInit {

  searchObject: SearchObject;
  responsePayload: any = {};
  @ViewChild('tableTracageDesDonnesComponent') tableTracageDesDonnesComponent: TableTracageDesDonnesComponent;

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
    searchObject.sort = new Sort('dateLog', 'desc nulls last');
    searchObject.listCol = ['case_', 'dateLog', 'httpMethod', 'ipAddress', 'nameService', 'nomUser', 'case_Ar','idLogData','uri'];

    return searchObject;
    


    
  }


  initDataList() {

    const request: RequestObject = <RequestObject>{
      uri: ADMINISTRATION_URI.TRACAGE_DONNES.DATA,
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
          this.responsePayload['isLoading'] = false
        } else {
          console.error(`Error in FicheGestionProfilsComponent/initData, error code :: ${response.code}`);
          this.toast.error();
          this.responsePayload['isLoading'] = false
        }
      },
      error: (error) => {
        console.error(`Error in FicheGestionProfilsComponent/initData, error :: ${error}`);
        this.toast.error();
        this.responsePayload['isLoading'] = false
      }
      
    });
  }

  onSearch($event) {
    this.searchObject.pagination.offSet = 0;
    this.searchObject.pagination.limit = 10;
    this.tableTracageDesDonnesComponent.paginatorComponent.paginator.pageIndex = 0;
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


}
