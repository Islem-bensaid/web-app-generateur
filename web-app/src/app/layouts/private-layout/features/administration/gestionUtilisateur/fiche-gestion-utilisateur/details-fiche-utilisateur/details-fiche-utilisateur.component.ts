import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "@shared/services/sharedWs/shared.service";
import {ToastService} from "@shared/services";
import {
  GestionProfilsMetadata
} from "@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata";
import {RequestObject} from "@shared/models";
import {ADMINISTRATION_URI} from '@privateLayout/shared/constantes';
import {ConstanteWs} from "@shared/constantes/ConstanteWs";
import {ResponseObject} from "@shared/models/ResponseObject";

@Component({
  selector: 'app-details-fiche-utilisateur',
  templateUrl: './details-fiche-utilisateur.component.html',
  styleUrls: ['./details-fiche-utilisateur.component.css']
})
export class DetailsFicheUtilisateurComponent implements OnInit {

  responsePayload: any = {};
  responsePayloadProfile
  ficheDetailsMetadata : any

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService,
              private toast: ToastService,) {
  }

  id;

  ngOnInit(): void {
    this.ficheDetailsMetadata= GestionProfilsMetadata.ficheDetailsUtilisateur
    this.id = this.activatedRoute.snapshot.params.id
    this.loadData(this.id)
  }

  loadData(id) {
    const request: RequestObject = <RequestObject>{

      uri: ADMINISTRATION_URI.GESTION_USER.ADM_USER_DETAILS,
      params: {
        path: [id]
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.responsePayload = response.payload.admUser;
          let listProfile=[]
          for (let i = 0; i < response.payload.listProfile.length; i++) {
            if (response.payload.listProfile[i].isChecked == true) {
              listProfile.push(response.payload.listProfile[i])
            }
          }
          this.responsePayloadProfile ={
            data:listProfile,
            count:response.payload.listProfile.length
          }

          this.responsePayload['nom'] =  this.responsePayload['nom'] +" "+this.responsePayload['prenom']
          if (this.responsePayload['isActif']==true)
            this.responsePayload['isActif']='adm.gp.content.details.statusValid'
          else
            this.responsePayload['isActif']='adm.gp.content.details.statusInvalid'
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
    this.router.navigate(['/app/adm/gu']);
  }

  onSort($event: any) {

  }
}
