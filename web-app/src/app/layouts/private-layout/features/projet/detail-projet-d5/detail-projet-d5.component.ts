import { Component, OnInit, ViewChild } from '@angular/core';
import { isEmptyValue, onAction } from '@app/shared/tools';
import { ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { Pagination, RequestObject, Sort } from '@shared/models';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { ConfirmDialogService, ToastService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { PROJET_URI } from '@privateLayout/shared/constantes/projet/projet-uri';
import { DatatableComponent } from '@shared/widgets';
import { WsFactory } from '@shared/tools/utils/ws-factory';
import { ViewerService } from '@privateLayout/shared/services/viewer.service';

@Component({
  selector: 'app-detail-projet-d5',
  templateUrl: './detail-projet-d5.component.html',
  styleUrls: ['./detail-projet-d5.component.css']
})
export class DetailProjetD5Component implements OnInit {

  @ViewChild('listTasksDatatable') listTasksDatatable: DatatableComponent;

  params: any = {};
  onAction = onAction;

  // chart params
  view: any[];
  legend: boolean = true;
  legendPosition: string = "right"; //bellow
  showLabels: boolean = true;
  animations: boolean = true;
  autoScale: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  showRefLabels: boolean = true;
  showRefLines: boolean = true;
  showGridLines: boolean = true;
  roundDomains: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Cost';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  constructor(
    private sharedService: SharedService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private viewerService: ViewerService,
  ) {
  }

  ngOnInit(): void {
    this.initParams();
    this.getInfoProjet();
  }

  /** common functions*/

  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['tableListDetailProjetTasks'] = {
      metadata: ProjetMetadata.ficheDetailsProjet5D.tableListDetailProjetTasks,
      responsePayload: {
        data: [],
        total: 0
      },
      pagination: new Pagination(0, 10),
      sort: new Sort('taskCode', 'ASC nulls last'),
      listCheckedTasks: []
    };
    this.params['infoProjet'] = {
      data: [],
      metadata: ProjetMetadata.ficheDetailsProjet5D.ficheInfoProjet
    };

    this.params['5CostChart'] = {
      data: [],
      metadata: ProjetMetadata.ficheDetailsProjet5D.ficheInfoProjet
    };

    this.params['isolateViewerTasksLoading'] = false;
  }

  /** sort functions */

  onSortTableListDetailProjetTasks(sort: any) {
    this.params['tableListDetailProjetTasks'].sort = sort;
    this.onSearch();
  }

  /**paginate functions*/

  onPaginateTableListDetailProjetTasks(pagination: Pagination) {
    this.params['tableListDetailProjetTasks'].pagination = pagination;
    this.getTasksList();
  }

  /** checking handle function */

  onCheckToggleTableListDetailProjetTasks(data) {
    if (this.params['tableListDetailProjetTasks']['listCheckedTasks'].includes(data.item.row.taskCode) && !data.item.checked) {
      this.params['tableListDetailProjetTasks']['listCheckedTasks'].splice(this.params['tableListDetailProjetTasks']['listCheckedTasks'].indexOf(data.item.row.taskCode), 1);
    } else if (!this.params['tableListDetailProjetTasks']['listCheckedTasks'].includes(data.item.row.taskCode) && data.item.checked) {
      this.params['tableListDetailProjetTasks']['listCheckedTasks'].push(data.item.row.taskCode);
    }
  }

  /** manage data functions */

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
          this.params['infoProjet'].data = response.payload;
          this.viewerService.initNativeViewer(document.getElementById('MyViewerDiv'), this.params['infoProjet'].data.urn)
          this.getTasksList();
          this.get5CostChartData(response.payload.idProjectPrimavera)
        } else {
          console.error(`Error in DetailProjetD5Component/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailProjetD5Component/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  getTasksList(datasearch?) {
    const request: RequestObject = <RequestObject>{

      uri: PROJET_URI.PRIMAVERA_URI.GET_TASKS_LIST,
      params: {
        query: {
          idProject: this.params['infoProjet'].data.idProjectPrimavera,
          lim: this.params['tableListDetailProjetTasks'].pagination.limit,
          page: this.params['tableListDetailProjetTasks'].pagination.offSet,
          sortNameCol: this.params['tableListDetailProjetTasks'].sort.nameCol,
          sortDir: this.params['tableListDetailProjetTasks'].sort.direction
        }
      },
      microservice: ConstanteWs._CODE_PRIMAVERA,
      method: ConstanteWs._CODE_GET
    };
    if (!isEmptyValue(datasearch)) {
      request.params.query = { ...request.params.query, ...datasearch };
    }
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          if (this.params['tableListDetailProjetTasks']['listCheckedTasks'].length) {
            response.payload.data.forEach(row=>{
              if (this.params['tableListDetailProjetTasks']['listCheckedTasks'].includes(row.taskCode)) {
                row['checked'] = true;
              }
              return row;
            })
          }
          this.params['tableListDetailProjetTasks'].responsePayload = response.payload;
        } else {
          console.error(`Error in DetailProjetD5Component/getTasksList, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DetailProjetD5Component/getTasksList, error :: ${error}`);
        this.toast.error();
      }
    });

  }

  private get5CostChartData(isPrimaveraProject, codes = null) {
    const request: RequestObject = <RequestObject>{
      uri: PROJET_URI.PRIMAVERA_URI.GET_5D_CHART_DATA,
      params: {
        query: {
          idProject: isPrimaveraProject
        }
      },
      microservice: ConstanteWs._CODE_PRIMAVERA,
      method: ConstanteWs._CODE_GET
    };
    if (!isEmptyValue(codes)) {
      request.params.query['codes'] = codes;
    }
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['5CostChart'].data = response.payload.data;
        } else {
          console.error(`Error in DashboardDetailsComponent/get5CostChartData, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DashboardDetailsComponent/get5CostChartData, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  /** filter viewer functions*/
  onSearch($event?: Partial<any>) {
    // this.params['tableListDetailProjetTasks'].pagination = new Pagination(0, 10);
    // this.params['tableListDetailProjetTasks'].sort = ;
    this.getTasksList($event);
    this.params['tableListDetailProjetTasks'].metadata.paginationPageIndex = 0;
  }


  onDeleteFilterViewerTask(taskCode) {
    this.params['tableListDetailProjetTasks']['listCheckedTasks'].splice(this.params['tableListDetailProjetTasks']['listCheckedTasks'].indexOf(taskCode), 1);
    this.listTasksDatatable.dataSource.data.forEach(row => {
      if (row.taskCode === taskCode) {
        row['checked'] = false;
      }
      return row;
    });
  }

  async onResetIsolationViewerTask() {
    this.params['isolateViewerTasksLoading'] = true;
    this.listTasksDatatable.dataSource.data.forEach(row => {
      row['checked'] = false;
      return row;
    });
    this.viewerService.isolateItems( []).then(flag=>{
      this.params['isolateViewerTasksLoading'] = flag;
      this.params['tableListDetailProjetTasks']['listCheckedTasks'] = [];
    })
  }

  async onIsolateViewerTasks() {
    this.params['isolateViewerTasksLoading'] = true;
    await this.viewerService.isolateItems(this.params['tableListDetailProjetTasks']['listCheckedTasks']).then(()=>{
      this.params['isolateViewerTasksLoading'] = false;
      this.get5CostChartData(this.params['infoProjet'].data.idProjectPrimavera,this.params['tableListDetailProjetTasks']['listCheckedTasks'].join(","))
    }).catch(()=>{
      this.params['isolateViewerTasksLoading'] = false;
      this.get5CostChartData(this.params['infoProjet'].data.idProjectPrimavera,this.params['tableListDetailProjetTasks']['listCheckedTasks'].join(","))
    });
  }

  onSave() {
    this.confirmDialogService.confirm().subscribe((flag) => {
      if (flag) {
        this.toast.success('general.success_save');
      }
    });
  }

  onPrecedent() {
    this.router.navigate(['/app/prj/5d'])
  }
}
