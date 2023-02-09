import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ToastService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestObject } from '@shared/models';
import { PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import {
  PredictionWithAiMetadata
} from '@privateLayout/shared/constantes/prediction-with-ai/prediction-with-ai-metadata';
import { onAction } from '@app/shared/tools';
import { MontantPipe } from '@shared/pipes';

@Component({
  selector: 'app-time-coast-prediction',
  templateUrl: './time-coast-prediction.component.html',
  styleUrls: ['./time-coast-prediction.component.css']
})
export class TimeCoastPredictionComponent implements OnInit {
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

  /** common functions */

  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['infoProjet'] = {
      data: [],
      metadata: PredictionWithAiMetadata.ficheInfoProjet
    };
    this.params['aiModelInputs'] = {
      data: [],
      metadata: PredictionWithAiMetadata.aiModelInputs
    };
    this.params['aiModelOutputs'] = {
      metadata: PredictionWithAiMetadata.aiModelOutputs,
      responsePayload: {
        data: [],
        total: 0
      }
    };
    ['costGauge', 'timeGauge'].forEach(chart => {
      this.params[chart] = {
        data: [],
        metadata: PredictionWithAiMetadata.charts[chart]
      };
    });
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
          this.getAiModelInputs(response.payload.idProjectPrimavera);
        } else {
          console.error(`Error in TimeCoastPredictionComponent/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in TimeCoastPredictionComponent/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  getAiModelInputs(idProjectPrimavera) {
    const request: RequestObject = <RequestObject>{
      uri: PROJET_URI.PRIMAVERA_URI.GET_AI_DATA,
      params: {
        query: {
          idProject: idProjectPrimavera
        }
      },
      microservice: ConstanteWs._CODE_PRIMAVERA,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          response.payload['BACF'] = this.montantPipe.transform(response.payload['BAC'], { devise: '$' });
          response.payload['ACF'] = this.montantPipe.transform(response.payload['AC'], { devise: '$' });
          response.payload['BCWPF'] = this.montantPipe.transform(response.payload['BCWP'], { devise: '$' });
          response.payload['BCWSF'] = this.montantPipe.transform(response.payload['BCWS'], { devise: '$' });
          this.params['aiModelInputs'].data = response.payload;
          this.params.costGauge.data = [
            {
              'name': 'Cost',
              'value': Math.floor((this.params['aiModelInputs'].data.AICOST / this.params['aiModelInputs'].data.BAC) * 100),
            }
          ];
          this.params.timeGauge.data = [
            {
              'name': 'Time',
              'value': Math.floor((this.params['aiModelInputs'].data.AITIME / this.params['aiModelInputs'].data.OD) * 100),
            }
          ];
          this.params['aiModelOutputs'].responsePayload = {
            data: [
              {
                id: this.params.timeGauge.data[0].value <= 110 ? 'TBM' : 'TBC',
                prediType: 'AI Time Prediction',
                prediValue: parseInt(this.params['aiModelInputs'].data.AITIME) + ' day',
                prediRecommandation: (() => {
                  // this.params['aiModelInputs'].data.AITIME > this.params['aiModelInputs'].data.OD ? 'Corrective Action' : 'No Action'
                  if (this.params.timeGauge.data[0].value <= 95) {
                    return 'Time Saving';
                  } else if (95 < this.params.timeGauge.data[0].value && this.params.timeGauge.data[0].value <= 105) {
                    return 'Time Under Control';
                  } else if (105 < this.params.timeGauge.data[0].value && this.params.timeGauge.data[0].value <= 110) {
                    return 'Slight Delay - Corrective Action Required';
                  } else if (110 < this.params.timeGauge.data[0].value) {
                    return 'Excessive Delay - Dramatic Action Required';
                  }
                })(),
                prediAction: (() => {
                  if (this.params.timeGauge.data[0].value <= 105) {
                    return 'No Action Required';
                  }else if (105 < this.params.timeGauge.data[0].value && this.params.timeGauge.data[0].value <= 110) {
                    return 'Close Management for Critical Activities';
                  } else if (110 < this.params.timeGauge.data[0].value) {
                    return 'Conduct Crashing/Fast Tracking';
                  }
                })(),
                exceTypeStr: (() => {
                  if (this.params.timeGauge.data[0].value <= 110 && this.params.timeGauge.data[0].value > 105) {
                    return 'TBM Activities List';
                  } else if (this.params.timeGauge.data[0].value > 110) {
                    return 'TBC Activities List';
                  }
                  return null;
                })()
              },
              {
                id: this.params.costGauge.data[0].value <= 110 ? 'TBA' : 'TBE',
                prediType: 'AI Cost Prediction',
                prediValue: this.montantPipe.transform(parseInt(this.params['aiModelInputs'].data.AICOST), { devise: '$' }),
                prediRecommandation: (() => {
                  // this.params['aiModelInputs'].data.AITIME > this.params['aiModelInputs'].data.OD ? 'Corrective Action' : 'No Action'
                  if (this.params.costGauge.data[0].value <= 95) {
                    return 'Cost Saving';
                  } else if (95 < this.params.costGauge.data[0].value && this.params.costGauge.data[0].value <= 105) {
                    return 'Budget Under Control';
                  } else if (105 < this.params.costGauge.data[0].value && this.params.costGauge.data[0].value <= 110) {
                    return 'Slight Over Budget - Corrective Action Required';
                  } else if (110 < this.params.costGauge.data[0].value) {
                    return 'Excessive Cost-overrun - Dramatic Action Required';
                  }
                })(),
                prediAction: (() => {
                  if (this.params.costGauge.data[0].value <= 105) {
                    return 'No Action Required';
                  } else if (105 < this.params.costGauge.data[0].value && this.params.costGauge.data[0].value <= 110) {
                    return 'Overrun Analysis/Transfer';
                  } else if (110 < this.params.costGauge.data[0].value) {
                    return 'Conduct Bottom-Up Estimate';
                  }
                })(),
                exceTypeStr: (() => {
                  if (this.params.costGauge.data[0].value <= 110 && this.params.costGauge.data[0].value > 110) {
                    return 'TBA Activities List';
                  } else if (this.params.costGauge.data[0].value > 110) {
                    return 'TBE Activities List';
                  }
                  return null;
                })()
              }
            ],
            total: 2
          };
        } else if (response.code == ConstanteWs._CODE_WS_ERROR_ALIAS_PARAM && response.payload == 'No project found in sumtask') {
          this.toast.error(response.payload);
        } else {
          console.error(`Error in TimeCoastPredictionComponent/getAiModelInputs, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in TimeCoastPredictionComponent/getAiModelInputs, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  onOutlineBtnTableListAiOutputs(row) {
    this.router.navigate(['app/ai/pl/tcp', this.params['pathParams'].idProjet, 'act', row.item.id]);
  }
}
