import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "@shared/services/sharedWs/shared.service";
import {ToastService} from "@shared/services";
import {
  GestionProfilsMetadata
} from "@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata";
import {RequestObject} from "@shared/models";
import {ADMINISTRATION_URI} from "@privateLayout/shared/constantes/administration/administration-uri-index";
import {ConstanteWs} from "@shared/constantes/ConstanteWs";
import {ResponseObject} from "@shared/models/ResponseObject";

@Component({
  selector: 'app-detail-tracage-des-donnes',
  templateUrl: './detail-tracage-des-donnes.component.html',
  styleUrls: ['./detail-tracage-des-donnes.component.css']
})
export class DetailTracageDesDonnesComponent implements OnInit {


  responsePayload: any = {};
  ficheDetailsMetadata: any
  id;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService,
              private toast: ToastService,) {
  }



  ngOnInit(): void {
    this.ficheDetailsMetadata = GestionProfilsMetadata.tableTracageDonnesDetails
    this.id = this.activatedRoute.snapshot.params.id
    this.loadData(this.id)
  }

  loadData(id) {
    const request: RequestObject = <RequestObject>{

      uri: ADMINISTRATION_URI.TRACAGE_DONNES.DETAILS,
      params: {
        path: [id]
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.responsePayload = response.payload;
          console.log(response.payload);
          if (this.responsePayload['flgActif'] == true)
            this.responsePayload['flgActif'] = 'adm.gp.content.details.statusValid'
          else
            this.responsePayload['flgActif'] = 'adm.gp.content.details.statusInvalid'
        } else {
          console.error(`Error in FicheGestionProfilsComponent/initData, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in FicheGestionProfilsComponent/initData, error :: ${error}`);
        this.toast.error();
      }
    });

  }

  backToList() {
    this.router.navigate(['/app/adm/tdd']);
  }
}
