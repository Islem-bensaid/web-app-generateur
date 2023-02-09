import { Component, OnInit } from '@angular/core';
import { initSearchObject, onAction } from '@app/shared/tools';
import { Location } from '@angular/common';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ToastService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MontantPipe } from '@shared/pipes';
import {
  PredictionWithAiMetadata
} from '@privateLayout/shared/constantes/prediction-with-ai/prediction-with-ai-metadata';
import { CriteriaSearch, Pagination, RequestObject, SearchObject } from '@shared/models';
import { PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';

@Component({
  selector: 'app-prediction-activities-list',
  templateUrl: './prediction-activities-list.component.html',
  styleUrls: ['./prediction-activities-list.component.css']
})
export class PredictionActivitiesListComponent implements OnInit {

  onAction = onAction;
  params: any = {};

  constructor(
    private _location: Location,
    private sharedService: SharedService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute,
    private montantPipe: MontantPipe,
    private router: Router
  ) {
    this.initParams();
  }

  ngOnInit(): void {
    this.getInfoProjet();
  }

  /** common functions*/

  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['infoProjet'] = {
      data: [],
      metadata: PredictionWithAiMetadata.ficheInfoProjet
    };

    if(['TBC', 'TBE', 'TBM'].includes(this.params.pathParams.idAction) ){
      this.params['predictionMethod'] = (()=>{
        switch (this.params.pathParams.idAction) {
          case 'TBE': return 'Excessive Cost-overrun - Dramatic Action Required'
          case 'TBC': return 'Excessive Delay - Dramatic Action Required'
          case 'TBM': return 'Slight Delay - Corrective Action Required'
        }
      })();
      this.params['activitiesList'] = {
        metadata:  PredictionWithAiMetadata.predActivitiesList(this.params.pathParams.idAction),
        responsePayload: {
          data: [],
          total: 0
        },
        requestObject: (idPrimaviraProject)=>{
          return <RequestObject>{
            uri: PROJET_URI.PRIMAVERA_URI.GET_PRED_ACTIVITIES_LIST,
            params: {
              query: {
                idProject: idPrimaviraProject,
                code: this.params.pathParams.idAction
              }
            },
            microservice: ConstanteWs._CODE_PRIMAVERA,
            method: ConstanteWs._CODE_GET
          }
        }
      };
    } else if(this.params.pathParams.idAction == 'TBA'){
      this.params['predictionMethod'] = 'Overrun Analysis / Transfer';
      this.params['activitiesList'] = {
        metadata:  PredictionWithAiMetadata.tbaActivitiesList,
        responsePayload: {
          data: [],
          total: 0
        },
        requestObject: (idPrimaviraProject)=>{
          const so = initSearchObject(<SearchObject>{
            pagination: new Pagination(),
            dataSearch: [
              new CriteriaSearch("projId",idPrimaviraProject, "="),
              new CriteriaSearch("physCompletePct",'0', ">"),
              new CriteriaSearch("physCompletePct",'100', "<")
            ]
          })
          return <RequestObject>{
            uri: PROJET_URI.PRIMAVERA_URI.TASK_DATA,
            params: {
              body: so
            },
            microservice: ConstanteWs._CODE_PRIMAVERA,
            method: ConstanteWs._CODE_POST
          }
        }
      };
    }
  }

  onPrecedent() {
    this._location.back();
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
          this.getActivitiesList(this.params['infoProjet'].data.idProjectPrimavera);
        } else {
          console.error(`Error in PredictionActivitiesListComponent/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in PredictionActivitiesListComponent/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }


  getActivitiesList(idProjectPrimavera) {
    const request: RequestObject = this.params.activitiesList.requestObject(idProjectPrimavera);
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['activitiesList'].responsePayload = response.payload;
        } else {
          console.error(`Error in PredictionActivitiesListComponent/getActivitiesList, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in PredictionActivitiesListComponent/getActivitiesList, error :: ${error}`);
        this.toast.error();
      }
    });
  }

}
