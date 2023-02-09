import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FicheDetailsMetadata, RequestObject} from "@shared/models";
import {ADMINISTRATION_URI} from "@privateLayout/shared/constantes/administration/administration-uri-index";
import {ConstanteWs} from "@shared/constantes/ConstanteWs";
import {ResponseObject} from "@shared/models/ResponseObject";
import {SharedService} from "@shared/services/sharedWs/shared.service";
import {ToastService} from "@shared/services";
import {
    GestionProfilsMetadata
} from "@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata";

@Component({
    selector: 'app-details-gestion-profils',
    templateUrl: './details-gestion-profils.component.html',
    styleUrls: ['./details-gestion-profils.component.css']
})
export class DetailsGestionProfilsComponent implements OnInit {
    responsePayload: any = {};
    ficheDetailsMetadata : any
    id;
    dataMenu: any;
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private sharedService: SharedService,
                private toast: ToastService,) {
    }



    ngOnInit(): void {
        this.ficheDetailsMetadata= GestionProfilsMetadata.ficheDetailsProfil
        this.id = this.activatedRoute.snapshot.params.id
        this.loadData(this.id)
    }

    loadData(id) {
        const request: RequestObject = <RequestObject>{

            uri: ADMINISTRATION_URI.GESTION_PROFILS.ADM_STATIC,
            params: {
                path: [id]
            },
            microservice: ConstanteWs._CODE_ADMINISTRATION,
            method: ConstanteWs._CODE_GET
        };
        this.sharedService.commonWs(request).subscribe({
            next: (response: ResponseObject) => {
                if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
                    this.responsePayload = response.payload.admProfil;
                    this.dataMenu=response.payload.listParent;
                    if (this.responsePayload['flgActif']==true)
                        this.responsePayload['flgActif']='adm.gp.content.details.statusValid'
                    else
                        this.responsePayload['flgActif']='adm.gp.content.details.statusInvalid'
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
        this.router.navigate(['/app/adm/gp']);
    }
}
