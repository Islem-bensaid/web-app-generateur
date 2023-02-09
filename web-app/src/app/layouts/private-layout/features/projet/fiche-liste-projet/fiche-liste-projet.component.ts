import { Component, OnInit } from '@angular/core';
import { initSearchObject, onAction } from '@app/shared/tools';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { Pagination, RequestObject, SearchObject, Sort } from '@shared/models';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';
import { ResponseObject } from '@shared/models/ResponseObject';

@Component({
  selector: 'app-fiche-liste-projet',
  templateUrl: './fiche-liste-projet.component.html',
  styleUrls: ['./fiche-liste-projet.component.css']
})
export class FicheListeProjetComponent implements OnInit {

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
    this.initDataList();
  }

  initParams() {
    this.params['_type'] = this.activatedRoute.snapshot.data.type;
    const getRightMetadata = (type) => {
      switch (type) {
        case ROUTING_TYPES.LP:
          return ProjetMetadata.ficheListProjet.tableListMesProjet;
        default:
          return ProjetMetadata.ficheListProjet.tableListProjet;
      }
    };
    this.params['tableListeProjet'] = {
      metadata: getRightMetadata(this.params['_type']),
      responsePayload: {
        data: [],
        total: 0
      },
      searchObject: initSearchObject(<SearchObject>{
        pagination: new Pagination(0, 10),
        sort: new Sort('id', 'desc nulls last')
      })
    };
  }

  initDataList() {
    const request: RequestObject = <RequestObject>{
      uri: PROJET_URI.LIST_PROJET,
      params: {
        body: this.params['tableListeProjet'].searchObject
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_POST
    };

    this.sharedService.commonWs(request).subscribe({
      next: (response) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['tableListeProjet'].responsePayload = response.payload;
        } else {
          console.error(`Error in FicheListeProjetComponent/initDataList, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in FicheListeProjetComponent/initDataList, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  onSearch($event) {
    this.params['tableListeProjet'].searchObject.pagination.offSet = 0;
    this.params['tableListeProjet'].searchObject.pagination.limit = 10;
    this.params['tableListeProjet'].searchObject.dataSearch = $event;
    this.initDataList();
  }

  onPaginateTableListProjet(pagination: Pagination) {
    this.params['tableListeProjet'].searchObject.pagination = pagination;
    this.initDataList();
  }

  /** sort functions */
  onSortTableListProjet(sort: Sort) {
    this.params['mediaList'].searchObject.sort = sort;
    this.initDataList();
  }

  openDetailsTableListProjet(row) {
    switch (this.params['_type']) {
      case ROUTING_TYPES.LP:
        this.router.navigate(['/app/prj/l/d', row.item.id]);
        return;
      case ROUTING_TYPES.D5:
        this.router.navigate(['/app/prj/5d/d', row.item.id]);
        return;
      case ROUTING_TYPES.D4:
        this.router.navigate(['/app/prj/4d/d', row.item.id]);
        return;
      case ROUTING_TYPES.D:
        this.router.navigate(['/app/prj/dashboard/d', row.item.id]);
        return;
      case ROUTING_TYPES.AI:
        this.router.navigate(['/app/ai/pl/tcp', row.item.id]);
        return;
      case ROUTING_TYPES['3D']:
        this.router.navigate(['/app/simulation/pl/f', row.item.id]);
        return;
      case ROUTING_TYPES.PR:
        this.router.navigate(['/app/media/pr/d', row.item.id]);
        return;
      case ROUTING_TYPES.VR:
        this.router.navigate(['/app/media/vr/d', row.item.id]);
        return;
      case ROUTING_TYPES.LC:
        this.router.navigate(['/app/media/lc/d', row.item.id]);
        return;
      case ROUTING_TYPES.HSER:
        this.router.navigate(['/app/documents/hse/d', row.item.id]);
        return;
      case ROUTING_TYPES.MOM:
        this.router.navigate(['/app/documents/mom/d', row.item.id]);
        return;
      case ROUTING_TYPES.RR:
        this.router.navigate(['/app/documents/rr/d', row.item.id]);
        return;
      case ROUTING_TYPES.MR:
        this.router.navigate(['/app/documents/mr/d', row.item.id]);
        return;
      case ROUTING_TYPES.DR:
        this.router.navigate(['/app/documents/dr/d', row.item.id]);
        return;
      case ROUTING_TYPES.DDra:
        this.router.navigate(['/app/documents/ddra/d', row.item.id]);
        return;
      case ROUTING_TYPES.ID:
        this.router.navigate(['/app/documents/id/d', row.item.id]);
        return;
      case ROUTING_TYPES.SD:
        this.router.navigate(['/app/documents/sd/d', row.item.id]);
        return;
      case ROUTING_TYPES.AD:
        this.router.navigate(['/app/documents/ad/d', row.item.id]);
        return;
      case ROUTING_TYPES.RFI:
        this.router.navigate(['/app/documents/rfi/d', row.item.id]);
        return;
      case ROUTING_TYPES.MIR:
        this.router.navigate(['/app/documents/mir/d', row.item.id]);
        return;
      case ROUTING_TYPES.MS:
        this.router.navigate(['/app/documents/ms/d', row.item.id]);
        return;
      case ROUTING_TYPES.WIR:
        this.router.navigate(['/app/documents/wir/d', row.item.id]);
        return;
      case ROUTING_TYPES.SI:
        this.router.navigate(['/app/documents/si/d', row.item.id]);
        return;
      case ROUTING_TYPES.NCRs:
        this.router.navigate(['/app/documents/ncrs/d', row.item.id]);
        return;
      case ROUTING_TYPES.NC:
        this.router.navigate(['/app/documents/nc/d', row.item.id]);
        return;
      case ROUTING_TYPES.VReq:
        this.router.navigate(['/app/documents/vreq/d', row.item.id]);
        return;
      case ROUTING_TYPES.AV:
        this.router.navigate(['/app/documents/av/d', row.item.id]);
        return;
      case ROUTING_TYPES.PC:
        this.router.navigate(['/app/documents/pc/d', row.item.id]);
        return;
      case ROUTING_TYPES.MReg:
        this.router.navigate(['/app/documents/mreg/d', row.item.id]);
        return;
    }
  }

  onEditTableListProjet(row) {
    this.router.navigate(['/app/prj/m', row.item.id]);
  }

  onDeleteTableListProjet(row) {
    this.confirmDialogService.confirm('', 'general.delete_confirmation').subscribe((flag) => {
      if (flag) {
        const request: RequestObject = <RequestObject>{
          uri: PROJET_URI.BASE_PROJET,
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
              this.initDataList();
            } else {
              console.error(`Error in FicheListeProjetComponent/onDeleteTableListProjet, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in FicheListeProjetComponent/onDeleteTableListProjet, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }
}
