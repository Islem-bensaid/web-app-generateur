import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { ActivatedRoute } from '@angular/router';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { CriteriaSearch, Pagination, RequestObject, SearchObject } from '@shared/models';
import { PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { ViewerService } from '@privateLayout/shared/services/viewer.service';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { Location } from '@angular/common';
import { initSearchObject, isEmptyValue } from '@shared/tools';
import { IMyExtension, MY_EXTENTION } from '@privateLayout/shared/services/viewer-extentions/IMyExtention';
import { IMyExtension3, MY_EXTENTION3 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention3';
import { IMyExtension6, MY_EXTENTION6 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention6';
import { IMyExtension4, MY_EXTENTION4 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention4';
import { IMyExtension5, MY_EXTENTION5 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention5';
import { IMyExtension2, MY_EXTENTION2 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention2';
import { IMyExtension1, MY_EXTENTION1 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention1';
import { formatStrDateAsPrimavira } from '@privateLayout/shared/tools/tools';

@Component({
  selector: 'app-detail-projet-d4',
  templateUrl: './detail-projet-d4.component.html',
  styleUrls: ['./detail-projet-d4.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailProjetD4Component implements OnInit {
  params: any = {};
  @ViewChild('ngGantt') ngGantt: GanttEditorComponent;
  @ViewChild('ngGantt') ngGantt1: ElementRef;


  vAdditionalHeaders = {
    pID: {
      title: 'Task Id'
    }
  };


  constructor(
    private sharedService: SharedService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private _location: Location,
    private viewerService: ViewerService,
    private viewerService1: ViewerService,
    private viewerService2: ViewerService,
    @Inject(MY_EXTENTION) private iMyExtension: IMyExtension,
    @Inject(MY_EXTENTION1) private iMyExtension1: IMyExtension1,
    @Inject(MY_EXTENTION2) private iMyExtension2: IMyExtension2,
    @Inject(MY_EXTENTION3) private iMyExtension3: IMyExtension3,
    @Inject(MY_EXTENTION4) private iMyExtension4: IMyExtension4,
    @Inject(MY_EXTENTION5) private iMyExtension5: IMyExtension5,
    @Inject(MY_EXTENTION6) private iMyExtension6: IMyExtension6
  ) {
  }

  ngOnInit(): void {
    this.initParams();
    this.getInfoProjet();

  }


  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['infoProjet'] = {
      data: [],
      metadata: ProjetMetadata.ficheDetailsProjet4D.ficheInfoProjet
    };
    this.params['ganttOptions'] = {
      data: [],
      metadata: this._initGanttOptions()
    };

    this.params['isolateViewerTasksLoading'] = false;

    this.params['viewOption'] = '001';

    this.params['CPI&SPI'] = {
      data: [],
      metadata: ProjetMetadata.ficheDetailsProjet4D['CPI&SPI']
    };

  }

  private _initGanttOptions() {
    return {
      vFormatArr: ['Day'],
      vFormat: 'day',
      vEditable: true,
      vLang: 'en',
      vTotalHeight: '400px',
      vTooltipDelay: 0,
      vQuarterColWidth: 45,
      vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
      // vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
      vDayMajorDateDisplayFormat: 'mm/yyyy - W ww', // Set format to display dates in the "Major" header of the "Day" view
      // vDayMajorDateDisplayFormat: 'Week ww', // Set format to display dates in the "Major" header of the "Day" view
      vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
      // vWeekMinorDateDisplayFormat: 'ww mon', // Set format to display dates in the "Minor" header of the "Week" view
      vAdditionalHeaders: this.vAdditionalHeaders,

      vShowTaskInfoLink: 1,
      vUseFade: 1,
      vUseMove: 1,
      vUseRowHlt: 1,
      vUseToolTip: 1,
      vEvents: {
        // onLineContainerHover: console.log,
        // onDateContainerClick: console.log,
        // onDateContainerHover: console.log,
        beforeDraw: () => console.log('before draw listener'),
        afterDraw: () => {
          const htmlMajorHeadingCollection = document.getElementsByClassName('gmajorheading');
          const htmlDaysCollection = document.getElementsByClassName('footerdays').item(0).childNodes;
          for (let i = 0; i < htmlDaysCollection.length; i++) {
            htmlDaysCollection[i].addEventListener('click', (e) => {
              this.params['ganttOptions']['selectedDate'] = (<HTMLDivElement>e.target).textContent + '/' + htmlMajorHeadingCollection[Math.floor(i / 7)].childNodes[0].textContent.split(' - ')[0];
              console.log('date', this.params['ganttOptions']['selectedDate']);
            });
          }


        },
        additional_pID: console.log
      }
      // vScrollTo: new Date(),
    } as GanttEditorOptions;
  }


  private getInfoProjet() {
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
          this.params['infoProjet'].data = response.payload;
          // this.viewerService.initNativeViewer(document.getElementById('MyViewerDiv'), this.params['infoProjet'].data.urn)
          this.params['viewer'] = this.viewerService.getViewerDefaultOptions(0, this.params['infoProjet'].data.urn[0]);
          this.getGanttData();
          this.getDataChartCpiAndSpi();
        } else {
          console.error(`Error in DetailProjetD4Component/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailProjetD4Component/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  private getGanttData() {
    const request: RequestObject = <RequestObject>{
      uri: PROJET_URI.PRIMAVERA_URI.GET_GANTT_DATA,
      params: {
        query: {
          idProject: this.params['infoProjet'].data.idProjectPrimavera
        }
      },
      microservice: ConstanteWs._CODE_PRIMAVERA,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['ganttOptions'].data = response.payload.data;
        } else {
          console.error(`Error in DetailProjetD4Component/getGanttData, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailProjetD4Component/getGanttData, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  getDataChartCpiAndSpi() {
    const request: RequestObject = <RequestObject>{
      uri: PROJET_URI.PRIMAVERA_URI.GET_CPI_AND_SPI_DATA_CHART,
      params: {
        query: {
          idProject: this.params['infoProjet'].data.idProjectPrimavera
        }
      },
      microservice: ConstanteWs._CODE_PRIMAVERA,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['CPI&SPI'].data = response.payload;
        } else {
          console.error(`Error in DetailProjetD4Component/getDataChartCpiAndSpi, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailProjetD4Component/getDataChartCpiAndSpi, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  onPrecedent() {
    this._location.back();
  }

  onSave() {
    this.confirmDialogService.confirm('', '').subscribe((flag) => {
      if (flag) {
        this.toast.success('general.success_save');
      }
    });
  }
  onViewOptionChanged(viewOption) {
    console.log('viewOption', viewOption);
    this.params['viewOption'] = viewOption;
    // debugger;
    switch (this.params['viewOption']) {
      case '001':
        this.viewerService.initNativeViewer(document.getElementById('MyViewerDiv'), this.params['infoProjet'].data.urn[0])
        return;
      case '002':
        if (isEmptyValue(this.params.viewer1)) {
          this.params['viewer1'] = this.viewerService.getViewerDefaultOptions(1, this.params['infoProjet'].data.urn[0]);
        }
        if (isEmptyValue(this.params.viewer2)) {
          this.params['viewer2'] = this.viewerService.getViewerDefaultOptions(2, this.params['infoProjet'].data.urn[0]);
        }
        return;
      case '003':
        if (isEmptyValue(this.params.viewer3)) {
          this.params['viewer3'] = this.viewerService.getViewerDefaultOptions(3, this.params['infoProjet'].data.urn[0]);
        }
        if (isEmptyValue(this.params.viewer4)) {
          this.params['viewer4'] = this.viewerService.getViewerDefaultOptions(4, this.params['infoProjet'].data.urn[0]);
        }
        if (isEmptyValue(this.params.viewer5)) {
          this.params['viewer5'] = this.viewerService.getViewerDefaultOptions(5, this.params['infoProjet'].data.urn[0]);
        }
        if (isEmptyValue(this.params.viewer6)) {
          this.params['viewer6'] = this.viewerService.getViewerDefaultOptions(6, this.params['infoProjet'].data.urn[0]);
        }
        return;
    }

  }

  async doIsolate(index, taskList = ['CON-LAB-STR-160', 'CON-LAB-STR-600', 'CON-LAB-STR-130']) {
    switch (index) {
      // case 0:
      //   return await this.iMyExtension.isolateItems(taskList).then(() => {
      //     this.params['isolateViewerTasksLoading'] = false;
      //   });
      case 1:
        return await this.iMyExtension1.isolateItems(taskList).then(() => {
          this.params['isolateViewerTasksLoading'] = false;
        });
      case 2:
        return await this.iMyExtension2.isolateItems(taskList).then(() => {
          this.params['isolateViewerTasksLoading'] = false;
        });
      case 3:
        return await this.iMyExtension3.isolateItems(taskList).then(() => {
          this.params['isolateViewerTasksLoading'] = false;
        });
      case 4:
        return await this.iMyExtension4.isolateItems(taskList).then(() => {
          this.params['isolateViewerTasksLoading'] = false;
        });
      case 5:
        return await this.iMyExtension5.isolateItems(taskList).then(() => {
          this.params['isolateViewerTasksLoading'] = false;
        });
      case 6:
        return await this.iMyExtension6.isolateItems(taskList).then(() => {
          this.params['isolateViewerTasksLoading'] = false;
        });
    }
    // await this.viewerService.isolateItems(taskList).then(()=>{ this.params['isolateViewerTasksLoading'] = false;});
  }


  // onViewOptionChanged(viewOption) {
  //   console.log('viewOption', viewOption);
  //   this.params['viewOption'] = viewOption;
  //   switch (this.params['viewOption']) {
  //     case '001':
  //       if (isEmptyValue(this.params.viewer)) {
  //         this.params['viewer'] = this.viewerService.getViewerDefaultOptions(0, this.params['infoProjet'].data.urn);
  //       }
  //       return;
  //     case '002':
  //       if (isEmptyValue(this.params.viewer1)) {
  //         this.params['viewer1'] = this.viewerService.getViewerDefaultOptions(1, this.params['infoProjet'].data.urn);
  //       }
  //       if (isEmptyValue(this.params.viewer2)) {
  //         this.params['viewer2'] = this.viewerService.getViewerDefaultOptions(2, this.params['infoProjet'].data.urn);
  //       }
  //       return;
  //     case '003':
  //       if (isEmptyValue(this.params.viewer3)) {
  //         this.params['viewer3'] = this.viewerService.getViewerDefaultOptions(3, this.params['infoProjet'].data.urn);
  //       }
  //       if (isEmptyValue(this.params.viewer4)) {
  //         this.params['viewer4'] = this.viewerService.getViewerDefaultOptions(4, this.params['infoProjet'].data.urn);
  //       }
  //       if (isEmptyValue(this.params.viewer5)) {
  //         this.params['viewer5'] = this.viewerService.getViewerDefaultOptions(5, this.params['infoProjet'].data.urn);
  //       }
  //       if (isEmptyValue(this.params.viewer6)) {
  //         this.params['viewer6'] = this.viewerService.getViewerDefaultOptions(6, this.params['infoProjet'].data.urn);
  //       }
  //       return;
  //   }
  //
  // }
  //
  // async doIsolate(index, taskList = ['CON-LAB-STR-160', 'CON-LAB-STR-600', 'CON-LAB-STR-130']) {
  //   switch (index) {
  //     case 0:
  //       return await this.iMyExtension.isolateItems(taskList).then(() => {
  //         this.params['isolateViewerTasksLoading'] = false;
  //       });
  //     case 1:
  //       return await this.iMyExtension1.isolateItems(taskList).then(() => {
  //         this.params['isolateViewerTasksLoading'] = false;
  //       });
  //     case 2:
  //       return await this.iMyExtension2.isolateItems(taskList).then(() => {
  //         this.params['isolateViewerTasksLoading'] = false;
  //       });
  //     case 3:
  //       return await this.iMyExtension3.isolateItems(taskList).then(() => {
  //         this.params['isolateViewerTasksLoading'] = false;
  //       });
  //     case 4:
  //       return await this.iMyExtension4.isolateItems(taskList).then(() => {
  //         this.params['isolateViewerTasksLoading'] = false;
  //       });
  //     case 5:
  //       return await this.iMyExtension5.isolateItems(taskList).then(() => {
  //         this.params['isolateViewerTasksLoading'] = false;
  //       });
  //     case 6:
  //       return await this.iMyExtension6.isolateItems(taskList).then(() => {
  //         this.params['isolateViewerTasksLoading'] = false;
  //       });
  //   }
  //   // await this.viewerService.isolateItems(taskList).then(()=>{ this.params['isolateViewerTasksLoading'] = false;});
  // }

  async onResetIsolationViewerTask() {
    this.params['isolateViewerTasksLoading'] = true;
    for (let i = 0; i < 6; i++) {
      this.doIsolate(i, []).then(flag => {
        this.params['isolateViewerTasksLoading'] = flag;
      });
    }

    // this.viewerService.isolateItems( []).then(flag=>{
    //   this.params['isolateViewerTasksLoading'] = flag;
    //   // this.params['tableListDetailProjetTasks']['listCheckedTasks'] = [];
    // })
  }

  async onIsolateViewerTasksActualVsPlanned() {
    this.params['isolateViewerTasksLoading'] = true;
    this.doIsolate(1, ['CON-LAB-STR-90', 'CON-LAB-STR-100'])
    this.doIsolate(2, [ 'CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560'])
    // const request: RequestObject = <RequestObject>{
    //   uri: PROJET_URI.PRIMAVERA_URI.TASK_DATA,
    //   params: {
    //     body: initSearchObject(<SearchObject>{
    //       pagination: new Pagination(),
    //       dataSearch: [
    //         new CriteriaSearch('projId', this.params['infoProjet'].data.idProjectPrimavera, '='),
    //         new CriteriaSearch('actStartDate',  formatStrDateAsPrimavira(this.params.ganttOptions.selectedDate), '<='),
    //         new CriteriaSearch('actEndDate', formatStrDateAsPrimavira(this.params.ganttOptions.selectedDate), '>=')
    //       ]
    //     })
    //   },
    //   microservice: ConstanteWs._CODE_PRIMAVERA,
    //   method: ConstanteWs._CODE_POST
    // };
    // this.sharedService.commonWs(request).subscribe({
    //   next: (response: ResponseObject) => {
    //     if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
    //       this.params['isolateViewerTasksLoading'] = false;
    //       const listOfTaskCodes = response.payload.data.map(task => task.taskCode);
    //       // this.params['activitiesList'].responsePayload = response.payload;
    //       this.doIsolate(1,listOfTaskCodes);
    //       // console.log('response', response);
    //     } else {
    //       console.error(`Error in DetailProjetD4Component/onIsolateViewerTasks, error code :: ${response.code}`);
    //       this.toast.error();
    //     }
    //   },
    //   error: (error) => {
    //     console.error(`Error in DetailProjetD4Component/onIsolateViewerTasks, error :: ${error}`);
    //     this.toast.error();
    //   }
    // });
    // const request1: RequestObject = <RequestObject>{
    //   uri: PROJET_URI.PRIMAVERA_URI.TASK_DATA,
    //   params: {
    //     body: initSearchObject(<SearchObject>{
    //       pagination: new Pagination(),
    //       dataSearch: [
    //         new CriteriaSearch('projId', this.params['infoProjet'].data.idProjectPrimavera, '='),
    //         new CriteriaSearch('targetStartDate', formatStrDateAsPrimavira(this.params.ganttOptions.selectedDate), '>='),
    //         new CriteriaSearch('targetEndDate', formatStrDateAsPrimavira(this.params.ganttOptions.selectedDate), '<=')
    //       ]
    //     })
    //   },
    //   microservice: ConstanteWs._CODE_PRIMAVERA,
    //   method: ConstanteWs._CODE_POST
    // };
    // this.sharedService.commonWs(request1).subscribe({
    //   next: (response: ResponseObject) => {
    //     if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
    //       this.params['isolateViewerTasksLoading'] = false;
    //       const listOfTaskCodes = response.payload.data.map(task => task.taskCode);
    //       this.doIsolate(2, listOfTaskCodes);
    //     } else {
    //       console.error(`Error in DetailProjetD4Component/onIsolateViewerTasks, error code :: ${response.code}`);
    //       this.toast.error();
    //     }
    //   },
    //   error: (error) => {
    //     console.error(`Error in DetailProjetD4Component/onIsolateViewerTasks, error :: ${error}`);
    //     this.toast.error();
    //   }
    // });
  }

  async onIsolateViewerTasksMonths() {
    // this.onIsolateViewerTasksActualVsPlanned();
    this.doIsolate(3, ['CON-LAB-STR-90', 'CON-LAB-STR-100']);
    this.doIsolate(4, [ 'CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560'])

    this.doIsolate(5, [ 'CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560'])
    this.doIsolate(6, ['CON-LAB-STR-90', 'CON-LAB-STR-100', 'CON-LAB-STR-140', 'CON-LAB-STR-150', 'CON-LAB-STR-170', 'CON-LAB-STR-240', 'CON-LAB-STR-250', 'CON-LAB-STR-230', 'CON-LAB-STR-560', 'CON-LAB-STR-440', 'CON-LAB-STR-420', 'CON-LAB-STR-390'])

      // this.params['isolateViewerTasksLoading'] = true;
      // const request: RequestObject = <RequestObject>{
      //   uri: PROJET_URI.PRIMAVERA_URI.TASK_DATA,
      //   params: {
      //     body: initSearchObject(<SearchObject>{
      //       pagination: new Pagination(),
      //       dataSearch: [
      //         new CriteriaSearch('projId', this.params['infoProjet'].data.idProjectPrimavera, '='),
      //         new CriteriaSearch('actStartDate', formatStrDateAsPrimavira(this.params.ganttOptions.selectedDate), '>='),
      //         new CriteriaSearch('actEndDate', formatStrDateAsPrimavira(this.params.ganttOptions.selectedDate), '<=')
      //       ]
      //     })
      //   },
      //   microservice: ConstanteWs._CODE_PRIMAVERA,
      //   method: ConstanteWs._CODE_POST
      // };
      // this.sharedService.commonWs(request).subscribe({
      //   next: (response: ResponseObject) => {
      //     if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
      //       this.params['isolateViewerTasksLoading'] = false;
      //       const listOfTaskCodes = response.payload.data.map(task => task.taskCode);
      //       // this.params['activitiesList'].responsePayload = response.payload;
      //       this.doIsolate(3, ['CON-LAB-STR-160']);
      //       this.doIsolate(4, ['CON-LAB-STR-600', 'CON-LAB-STR-160']);
      //
      //       this.doIsolate(5, ['CON-LAB-STR-600', 'CON-LAB-STR-160']);
      //       this.doIsolate(6, ['CON-LAB-STR-600', 'CON-LAB-STR-160','CON-LAB-STR-130']);
      //       // console.log('response', response);
      //     } else {
      //       console.error(`Error in DetailProjetD4Component/onIsolateViewerTasks, error code :: ${response.code}`);
      //       this.toast.error();
      //     }
      //   },
      //   error: (error) => {
      //     console.error(`Error in DetailProjetD4Component/onIsolateViewerTasks, error :: ${error}`);
      //     this.toast.error();
      //   }
      // });
  }





}
