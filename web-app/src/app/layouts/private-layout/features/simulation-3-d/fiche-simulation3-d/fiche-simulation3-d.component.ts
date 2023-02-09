import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestObject } from '@shared/models';
import { PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ToastService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewerService } from '@privateLayout/shared/services/viewer.service';
import { MontantPipe } from '@shared/pipes';
import { LineSeriesComponent } from '@swimlane/ngx-charts';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-fiche-simulation3-d',
  templateUrl: './fiche-simulation3-d.component.html',
  styleUrls: ['./fiche-simulation3-d.component.css']
})
export class FicheSimulation3DComponent implements OnInit {

  @ViewChild("matSlider") matSlider: MatSlider;

  params: any = {};
  private viewerServiceAct: ViewerService = new ViewerService();
  private viewerServicePla: ViewerService = new ViewerService();

  constructor(
    private sharedService: SharedService,
    private toast: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private montantPipe: MontantPipe
  ) {
    this.initParams();
  }

  ngOnInit(): void {
    this.getInfoProjet();
  }

  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['baseInformation'] = {
      data: [],
      metadata: ProjetMetadata.ficheDetailProjet.ficheBaseInoProjet
    };
    this.params['simulationDataList'] = [
      {
        date: '01/2022',
        actualCost: 1000,
        actualTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100'],
        plannedCost: 3000,
        plannedTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150']
      },
      {
        date: '02/2022',
        actualCost: 3000,
        actualTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150'],
        plannedCost: 4000,
        plannedTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250']
      },
      {
        date: '03/2022',
        actualCost: 4000,
        actualTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250'],
        plannedCost: 5000,
        plannedTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560']
      },
      {
        date: '04/2022',
        actualCost: 5000,
        actualTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560'],
        plannedCost: 6000,
        plannedTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560', 'CON-LAB-STR-440', 'CON-LAB-STR-420', 'CON-LAB-STR-390']
      },
      {
        date: '05/2022',
        actualCost: 7000,
        actualTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560', 'CON-LAB-STR-440', 'CON-LAB-STR-420', 'CON-LAB-STR-390'],
        plannedCost: 8000,
        plannedTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560', 'CON-LAB-STR-440', 'CON-LAB-STR-420', 'CON-LAB-STR-390', '	CON-LAB-STR-360	',
          '	CON-LAB-STR-330	',
          '	CON-LAB-STR-310	',
          '	CON-LAB-STR-300	',
          '	CON-LAB-STR-290	',
          '	CON-LAB-STR-280	',
          '	CON-LAB-STR-660	',
          '	CON-LAB-STR-650	',
          "	CON-LAB-STR-610	"	,
          "	CON-LAB-STR-590	"	,
          "	CON-LAB-STR-570	"	,
          "	CON-LAB-STR-550	"	,
          "	CON-LAB-STR-540	"	,
          "	CON-LAB-STR-520	"	,
          "	CON-LAB-STR-480	"	,
          "	CON-LAB-STR-980	"	,
          "	CON-LAB-STR-970	"	,
          "	CON-LAB-STR-900	"	,
          "	CON-LAB-STR-830	"	,
          "	CON-LAB-STR-800	"	,
          "	CON-LAB-STR-780	"	,
          "	CON-LAB-STR-770	"	,
          "	CON-LAB-STR-740	"	,
          "	CON-LAB-STR-730	"	,]
      },
      {
        date: '06/2022',
        actualCost: 8000,
        actualTaskCodes: ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560', 'CON-LAB-STR-440', 'CON-LAB-STR-420', 'CON-LAB-STR-390', '	CON-LAB-STR-360	',
          '	CON-LAB-STR-330	',
          '	CON-LAB-STR-310	',
          '	CON-LAB-STR-300	',
          '	CON-LAB-STR-290	',
          '	CON-LAB-STR-280	',
          '	CON-LAB-STR-660	',
          '	CON-LAB-STR-650	',
          "	CON-LAB-STR-610	"	,
          "	CON-LAB-STR-590	"	,
          "	CON-LAB-STR-570	"	,
          "	CON-LAB-STR-550	"	,
          "	CON-LAB-STR-540	"	,
          "	CON-LAB-STR-520	"	,
          "	CON-LAB-STR-480	"	,
          "	CON-LAB-STR-980	"	,
          "	CON-LAB-STR-970	"	,
          "	CON-LAB-STR-900	"	,
          "	CON-LAB-STR-830	"	,
          "	CON-LAB-STR-800	"	,
          "	CON-LAB-STR-780	"	,
          "	CON-LAB-STR-770	"	,
          "	CON-LAB-STR-740	"	,
          "	CON-LAB-STR-730	"	,],
        plannedCost: 9000,
        plannedTaskCodes: ["	CON-LAB-STR-90	"	,
          "	CON-LAB-STR-110	"	,
          "	CON-LAB-STR-100	"	,
          "	CON-LAB-STR-170	"	,
          "	CON-LAB-STR-150	"	,
          "	CON-LAB-STR-140	"	,
          "	CON-LAB-STR-250	"	,
          "	CON-LAB-STR-240	"	,
          "	CON-LAB-STR-230	"	,
          "	CON-LAB-STR-560	"	,
          "	CON-LAB-STR-440	"	,
          "	CON-LAB-STR-420	"	,
          "	CON-LAB-STR-390	"	,
          "	CON-LAB-STR-360	"	,
          "	CON-LAB-STR-330	"	,
          "	CON-LAB-STR-310	"	,
          "	CON-LAB-STR-300	"	,
          "	CON-LAB-STR-290	"	,
          "	CON-LAB-STR-280	"	,
          "	CON-LAB-STR-660	"	,
          "	CON-LAB-STR-650	"	,
          "	CON-LAB-STR-610	"	,
          "	CON-LAB-STR-590	"	,
          "	CON-LAB-STR-570	"	,
          "	CON-LAB-STR-550	"	,
          "	CON-LAB-STR-540	"	,
          "	CON-LAB-STR-520	"	,
          "	CON-LAB-STR-480	"	,
          "	CON-LAB-STR-980	"	,
          "	CON-LAB-STR-970	"	,
          "	CON-LAB-STR-900	"	,
          "	CON-LAB-STR-830	"	,
          "	CON-LAB-STR-800	"	,
          "	CON-LAB-STR-780	"	,
          "	CON-LAB-STR-770	"	,
          "	CON-LAB-STR-740	"	,
          "	CON-LAB-STR-730	"	,
          "	CON-LAB-STR-690	"	,
          "	CON-LAB-STR-680	"	,
          "	CON-LAB-STR-1020	"	,
          "	CON-LAB-STR-960	"	,
          "	CON-LAB-STR-950	"	,
          "	CON-LAB-STR-1100	"
        ]
      }
    ];
    this.params['sliderMaxValue'] = this.params['simulationDataList'].length -1 || 1;
    this.params['sliderDisabled'] = true;
    this.params['playBtnDisabled'] = true;
    this.params['isolationData'] = {
      actual: {
        date: this.params['simulationDataList'][0].date || '',
        cost: this.montantPipe.transform(this.params['simulationDataList'][0].actualCost || 0, { devise: '$' })
      },
      planned: {
        date: this.params['simulationDataList'][0].date || '',
        cost: this.montantPipe.transform(this.params['simulationDataList'][0].plannedCost || 0, { devise: '$' })
      }
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
          this.params['baseInformation'].data = response.payload;
          this.viewerServiceAct.initNativeViewer(document.getElementById('MyViewerDivAct'), response.payload.urn);
          this.viewerServicePla.initNativeViewer(document.getElementById('MyViewerDivPla'), response.payload.urn);
          setTimeout(() => {
              this.params.sliderDisabled = false;
              this.params.playBtnDisabled = false;
              console.log('this.params.simulationDataList[0].actualTaskCodes', this.params.simulationDataList[0].actualTaskCodes);
              this.onIsolateViewerTasks(this.params.simulationDataList[0].actualTaskCodes, this.params.simulationDataList[0].plannedTaskCodes);
            }
            , 10000);
        } else {
          console.error(`Error in FicheSimulation3DComponent/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in FicheSimulation3DComponent/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  updateSlider(event) {
    // list = [{
    //   date: '01/2022',
    //   actualCost: 1000,
    //   actualTaskCodes: [],
    //   plannedCost: 1000,
    //   plannedTaskCodes: [],
    // }]
    this.params.isolationData.actual.date = this.params.simulationDataList[event.value].date;
    this.params.isolationData.actual.cost = this.montantPipe.transform(this.params.simulationDataList[event.value].actualCost || 0, { devise: '$' });
    this.params.isolationData.planned.date = this.params.simulationDataList[event.value].date;
    this.params.isolationData.planned.cost = this.montantPipe.transform(this.params.simulationDataList[event.value].plannedCost || 0, { devise: '$' });

    return this.onIsolateViewerTasks(this.params.simulationDataList[event.value].actualTaskCodes, this.params.simulationDataList[event.value].plannedTaskCodes);
  }

  async onIsolateViewerTasks(actualTaskCodes, plannedTaskCodes) {
    await this.viewerServiceAct.isolateItems(actualTaskCodes);
    await this.viewerServicePla.isolateItems(plannedTaskCodes);
  }

  displayLabelSlider() {

    return `01\n2022`;
  }

  onPlaySimulation() {
    this.onIsolateViewerTasks(this.params.simulationDataList[1].actualTaskCodes, this.params.simulationDataList[1].plannedTaskCodes).then(()=>{
      this.matSlider.value = 1;
    });
    this.params.playBtnDisabled = true;
    for (var i=2;i<this.params.simulationDataList.length;i++) {
      ((ind) => {
        setTimeout(()=>{
          this.updateSlider({value: ind}).then(()=>{
            this.matSlider.value = ind;
            if (ind == this.params.simulationDataList.length -1) {
              this.params.playBtnDisabled = false;
            }
          });
        }, 2500 * ind);
      })(i);
      // this.onIsolateViewerTasks(this.params.simulationDataList[i].actualTaskCodes, this.params.simulationDataList[i].plannedTaskCodes).then(()=>{
      //   this.matSlider.value = i;
      //   if (i == this.params.simulationDataList.length -1) {
      //     this.params.playBtnDisabled = false;
      //   }
      // });
    }
  }
}
