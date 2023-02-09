import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { AppTranslateService, ConfirmDialogService, ToastService } from '@shared/services';
import { ActivatedRoute } from '@angular/router';
import {  ProjetMetadata } from '@privateLayout/shared/constantes/projet/projet-metadata';
import { CriteriaSearch, Pagination, RequestObject, SearchObject, SelectMetadata, Sort } from '@shared/models';
import {
  AREA_OF_CONCERS,
  CHART,
  EXECUTIVE_REPORTS,
  PROJET_URI
} from '@privateLayout/shared/constantes/projet/projet-uri';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { initSearchObject, isEmptyValue, onAction } from '@app/shared/tools';

import {
  DialogAddExecutiveReportComponent
} from '@privateLayout/features/projet/dashboard-details/dialog-add-executive-report/dialog-add-executive-report.component';
import {
  DialogGalleryMediaComponent
} from '@shared/widgets/dialogs/examples/dialog-gallery-media/dialog-gallery-media.component';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { COMMON_METADATA } from '@shared/constantes/CommonMetadata';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Icons } from '@shared/constantes/Icons';
import {
  DialogAddAreaComponent
} from '@privateLayout/features/projet/dashboard-details/dialog-add-area/dialog-add-area.component';
import { REQUEST_SPE_CASE } from '@shared/constantes/Constante';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DatatableComponent } from '@shared/widgets';
import { DashboardMetadata } from '@privateLayout/shared/constantes/dashboard/dashboard-metadata';


@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.css']
})
export class DashboardDetailsComponent implements OnInit {

  onAction = onAction;

  params: any = {};
  form: UntypedFormGroup;

  multi: any;


  // options
  view: any[];
  legend: boolean = true;
  legendPosition: string = 'right'; //bellow
  gradient: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  autoScale: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  showRefLabels: boolean = true;
  showRefLines: boolean = true;
  showGridLines: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  roundDomains: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Resources number';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private sharedService: SharedService,
    private toast: ToastService,
    private confirmDialogService: ConfirmDialogService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private appTranslateService: AppTranslateService,
    private formBuilder: UntypedFormBuilder
  ) {
  }

  ngOnInit() {

    this.initParams();
    this.getInfoProjet();
    this.initTableListExecutiveReports();
    this.initTableListAreas();
    this.updateDataCharts();
  }

  initParams() {
    this.params['pathParams'] = { ...this.activatedRoute.snapshot.params };
    this.params['infoProjet'] = {
      data: [],
      metadata: ProjetMetadata.ficheDetailsProjet5D.ficheInfoProjet
    };

    this.params['tableListExecutiveReports'] = {
      metadata: ProjetMetadata.ficheAddEditProjet.tableListExecutiveReports,
      responsePayload: {
        data: [],
        total: 0
      },
      searchObject: initSearchObject(<SearchObject>{
        pagination: new Pagination(0, 5),
        dataSearch: [new CriteriaSearch('idProject', this.params['pathParams'].idProjet, '=')]
      })
    };

    this.params['tableListAreas'] = {
      metadata: DashboardMetadata.tableListAreas,
      responsePayload: {
        data: [],
        total: 0
      },
      searchObject: initSearchObject(<SearchObject>{
        pagination: new Pagination(0, 5),
        dataSearch: [new CriteriaSearch('idProject', this.params['pathParams'].idProjet, '=')]
      })
    };


    this.params['codeLaborHistogram'] = {
      metadata: <SelectMetadata>COMMON_METADATA.nmSelectMetadata({
        label: 'Resource Type',
        value: 'code',
        optionLabel: 'code',
        reset: false
      }),
      data: []
    };

    ['sCurve', 'laborHistogram'].forEach(chart => {
      this.params[chart] = {
        data: [],
        metadata: DashboardMetadata.charts[chart]
      };
    });

    [
      'tableMaterialSubmittalStatus',
      'tableShopDrawingStatus',
      'tableAsBuiltDrawingStatus',
      'tableHseReport',
      'tableContractorPaymentStatus',
      'tableConsultantPaymentStatus',
      'tableVariationOrders',
      'tableClaims'
    ].forEach(chart => {
      this.params[chart] = {
        metadata: DashboardMetadata[chart],
        responsePayload: {
          data: [],
          total: 0
        }
      };
    });

    ['materialSubmittalStatus',
      'shopDrawingStatus',
      'asBuiltDrawingStatus',
      'hseReport'
    ].forEach(chart => {
      this.params[chart] = {
        data: [],
        metadata: DashboardMetadata.charts[chart]
      };
    });

  }

  initForm(formData?) {
    return this.formBuilder.group({
      code: new FormControl(formData.code)
    });
  }

  getFormControl(key) {
    return this.form.get(key) as UntypedFormControl;
  }


  /** manage data functions */

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
          this.getListCodeLaborHisto(response.payload.idProjectPrimavera);
          this.getSCurveChartData(response.payload.idProjectPrimavera);
          // this.getLaborHistogramChartData(response.payload.idProjectPrimavera);
        } else {
          console.error(`Error in DashboardDetailsComponent/getInfoProjet, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DashboardDetailsComponent/getInfoProjet, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  private getSCurveChartData(isPrimaveraProject) {
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
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['sCurve'].data = response.payload.data;
        } else {
          console.error(`Error in DashboardDetailsComponent/getSCurveChartData, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DashboardDetailsComponent/getSCurveChartData, error :: ${error}`);
        this.toast.error();
      }
    });
  }


  getListCodeLaborHisto(isPrimaveraProject) {
    const request: RequestObject = <RequestObject>{
      uri: PROJET_URI.PRIMAVERA_URI.GET_LABOR_HISTOGRAM_CHART_CODES,
      params: {
        query: {
          idProject: isPrimaveraProject
        }
      },
      microservice: ConstanteWs._CODE_PRIMAVERA,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.form = this.initForm({ code: response.payload.data[0] });
          this.params['codeLaborHistogram'].data = response.payload.data.map(e => ({ code: e, label: e }));
          this.getLaborHistogramChartData(response.payload.data[0]);
        } else {
          console.error(`Error in DashboardDetailsComponent/getListCodeLaborHisto, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in DashboardDetailsComponent/getListCodeLaborHisto, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  onCodeLaborHistChanged(value) {
    if (!isEmptyValue(value)) {
      this.getLaborHistogramChartData(value.code);
    }
  }

  private getLaborHistogramChartData(codeLaborHisto) {
    const request: RequestObject = <RequestObject>{
      uri: PROJET_URI.PRIMAVERA_URI.GET_LABOR_HISTOGRAM_CHART_DATA,
      params: {
        query: {
          idProject: this.params['infoProjet'].data.idProjectPrimavera,
          code: codeLaborHisto
        }
      },
      microservice: ConstanteWs._CODE_PRIMAVERA,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.params['laborHistogram'].data = response.payload.data;
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

  initTableListExecutiveReports() {
    if (!isEmptyValue(this.params['pathParams'].idProjet)) {

      const request: RequestObject = <RequestObject>{
        // uri: EXECUTIVE_REPORTS.LIST_EXECUTIVE_REPORTS,
        uri: EXECUTIVE_REPORTS.GET_LIST_EXECUTIVE_REPORTS_PER_PROJECT,
        params: {
          // body: this.params['tableListExecutiveReports'].searchObject
          query: {
            idProject: this.params['pathParams'].idProjet
          }
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        // method: ConstanteWs._CODE_POST
        method: ConstanteWs._CODE_GET
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            response.payload.forEach(item => {
              item['btns'] = {};
              item['btns'][Icons.openImage.ref] = !isEmptyValue(item.dataMedia);
              return item;
            });
            this.params.tableListExecutiveReports.responsePayload = {
              data: response.payload,
              total: response.payload.length
            };
          } else {
            console.error(`Error in DashboardDetailsComponent/initTableListExecutiveReports, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in DashboardDetailsComponent/initTableListExecutiveReports, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  initTableListAreas() {
    if (!isEmptyValue(this.params['pathParams'].idProjet)) {

      const request: RequestObject = <RequestObject>{
        uri: AREA_OF_CONCERS.LIST_AREA_OF_CONCERS,
        params: {
          body: this.params.tableListAreas.searchObject
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_POST
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.params.tableListAreas.responsePayload = response.payload;
          } else {
            console.error(`Error in DashboardDetailsComponent/initTableListAreas, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in DashboardDetailsComponent/initTableListAreas, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  updateDataCharts(tableCode?, chartCode?) {
    if (isEmptyValue(chartCode) && !isEmptyValue(tableCode)) {
      this.initDataTableForCharts(tableCode);
    } else if (!isEmptyValue(chartCode) && !isEmptyValue(tableCode)) {
      this.initDataTableForCharts(tableCode);
      this.initDataCharts(chartCode, tableCode);
      return;
    } else {
      // ['tableMaterialSubmittalStatus', 'tableShopDrawingStatus', 'tableAsBuiltDrawingStatus', 'tableHseReport'].forEach(tableCode => {
      [
        {
          table: 'tableMaterialSubmittalStatus',
          chart: 'materialSubmittalStatus'
        },
        {
          table: 'tableShopDrawingStatus',
          chart: 'shopDrawingStatus'
        },
        {
          table: 'tableAsBuiltDrawingStatus',
          chart: 'asBuiltDrawingStatus'
        },
        {
          table: 'tableHseReport',
          chart: 'hseReport'
        },
        {
          table: 'tableContractorPaymentStatus'
        },
        {
          table: 'tableConsultantPaymentStatus'
        },
        {
          table: 'tableVariationOrders'
        },
        {
          table: 'tableClaims'
        }
      ].forEach(caseCode => {
        this.initDataTableForCharts(caseCode.table);
        this.initDataCharts(caseCode.chart, caseCode.table);
      });
      return;
    }
  }

  initDataTableForCharts(tableCode) {
    if (!isEmptyValue(this.params['pathParams'].idProjet) && !isEmptyValue(tableCode)) {
      const so: SearchObject = initSearchObject(<SearchObject>{
        pagination: new Pagination(),
        dataSearch: [new CriteriaSearch('idProjet', this.params['pathParams'].idProjet, '=')]
      });
      if (['tableContractorPaymentStatus', 'tableConsultantPaymentStatus', 'tableVariationOrders', 'tableClaims', 'tableHseReport'].includes(tableCode)) {
        so.sort = new Sort('sn', 'asc');
      }
      if (['tableContractorPaymentStatus', 'tableConsultantPaymentStatus', 'tableVariationOrders', 'tableClaims'].includes(tableCode)) {
        so.dataSearch.push(new CriteriaSearch('code', tableCode, '='));
      }
      const request: RequestObject = <RequestObject>{
        uri: CHART[tableCode].DATA,
        params: {
          body: so
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_POST
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.params[tableCode].responsePayload = response.payload;
          } else {
            console.error(`Error in DashboardDetailsComponent/initDataTableForCharts, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in DashboardDetailsComponent/initDataTableForCharts, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  initDataCharts(chartCode, tableCode) {
    if (!isEmptyValue(this.params['pathParams'].idProjet) && !isEmptyValue(chartCode) && !isEmptyValue(tableCode)) {
      const request: RequestObject = <RequestObject>{
        uri: CHART[tableCode].CHART,
        params: {
          query: {
            idProject: this.params['pathParams'].idProjet
          }
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_GET
      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            this.params[chartCode].data = response.payload;
          } else {
            console.error(`Error in DashboardDetailsComponent/initDataCharts, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in DashboardDetailsComponent/initDataCharts, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }


  /** Add functions */
  private _doOpenDialogAddExecutiveReport(row?) {
    let metadata = null;
    if (!isEmptyValue(row)) {
      metadata = {
        item: row.item,
        idProject: this.params['pathParams'].idProjet
      };
    }
    this.sharedService
      .openDialog(DialogAddExecutiveReportComponent, metadata)
      .subscribe((response) => {
        if (response) {
          this.initTableListExecutiveReports();
        }
      });
  }

  onAddTableListExecutiveReports() {
    if (Object.keys(this.params['pathParams']).includes('idProjet')) {
      this._doOpenDialogAddExecutiveReport({ item: { idProject: this.params['pathParams'].idProjet } });
    }
  }

  private _doOpenDialogAddTableListAreas(row?) {
    let metadata = null;
    if (!isEmptyValue(row)) {
      metadata = {
        item: row.item,
        idProject: this.params['pathParams'].idProjet
      };
    } else {
      metadata = {
        idProject: this.params['pathParams'].idProjet
      };
    }
    this.sharedService
      .openDialog(DialogAddAreaComponent, metadata)
      .subscribe((response) => {
        if (response) {
          this.initTableListAreas();
        }
      });
  }

  onAddTableListAreas() {
    if (Object.keys(this.params['pathParams']).includes('idProjet')) {
      this._doOpenDialogAddTableListAreas();
    }
  }

  /** edit functions */

  onEditTableListExecutiveReports(row) {
    this._doOpenDialogAddExecutiveReport(row);
  }

  onEditTableListAreas(row) {
    if (Object.keys(this.params['pathParams']).includes('idProjet')) {
      this._doOpenDialogAddTableListAreas(row);
    }
  }

  /** delete functions */

  onDeleteTableListExecutiveReports(row) {
    this.confirmDialogService.confirm('', 'general.delete_confirmation').subscribe(flag => {
      if (flag) {
        const request: RequestObject = <RequestObject>{
          uri: EXECUTIVE_REPORTS.BASE_EXECUTIVE_REPORTS,
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
              this.initTableListExecutiveReports();
            } else {
              console.error(`Error in AddEditProjetComponent/onDeleteTableListExecutiveReports, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            console.error(`Error in AddEditProjetComponent/onDeleteTableListExecutiveReports, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }

  /** sort functions */

  onSortTableListExecutiveReports(sort: Sort) {
    this.params['tableListExecutiveReports'].searchObject.sort = sort;
    this.initTableListExecutiveReports();
  }

  /** pagination functions */
  onPaginateTableListExecutiveReports(pagination: Pagination) {
    this.params['tableListExecutiveReports'].searchObject.sort = null;
    this.params['tableListExecutiveReports'].searchObject.pagination = pagination;
    this.initTableListExecutiveReports();
  }

  /** open images functions */
  openImageTableListExecutiveReports(row) {
    const metadata = {
      listMedias: row.item.dataMedia,
      selectedIdx: 0
    };
    this.dialog.open(DialogGalleryMediaComponent, {
      disableClose: true,
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      direction: this.appTranslateService.getDir(),
      autoFocus: true,
      data: metadata
    }).afterClosed().pipe(map((response) => response.data));
  }

  /** Control Value change function */
  onValueChangeTableMaterialSubmittalStatus(row) {
    const tempDatasource = this.params.tableMaterialSubmittalStatus.responsePayload.data;
    tempDatasource.forEach((tempRow, index) => {
      if (row.index == index) {
        tempRow[row.item.key] = Number(row.item.value);
        tempRow['total'] = ((tempRow) => {
          let tempTotal = 0;
          for (const [key, value] of Object.entries(tempRow)) {
            if (['st','ar', 'cv','la','el', 'me', 'dr'].includes(key)) {
              tempTotal += Number(value);
            }
          }
          return tempTotal;
        })(tempRow);
        tempDatasource[tempDatasource.length - 1].total = ((tempDatasource) => {
          let tot = 0;
          for (const r of tempDatasource.filter(x=>!isEmptyValue(x.code))) {
            tot += Number(r.total);
          }
          return tot;
        })(tempDatasource);
        tempRow['pourcentage'] = Math.floor((Number(tempRow['total']) / Number(tempDatasource[tempDatasource.length-1].total) )*100) + '%';
      }
    })
  }

  onValueChangeTableShopDrawingStatus(row) {
    const tempDatasource = this.params.tableShopDrawingStatus.responsePayload.data;
    tempDatasource.forEach((tempRow, index) => {
      if (row.index == index) {
        tempRow[row.item.key] = Number(row.item.value);
        tempRow['total'] = ((tempRow) => {
          let tempTotal = 0;
          for (const [key, value] of Object.entries(tempRow)) {
            if (['st','ar', 'me','el','gn', 'la'].includes(key)) {
              tempTotal += Number(value);
            }
          }
          return tempTotal;
        })(tempRow);
        tempDatasource[tempDatasource.length - 1].total = ((tempDatasource) => {
          let tot = 0;
          for (const r of tempDatasource.filter(x=>!isEmptyValue(x.code))) {
            tot += Number(r.total);
          }
          return tot;
        })(tempDatasource);
        tempRow['pourcentage'] = Math.floor((Number(tempRow['total']) / Number(tempDatasource[tempDatasource.length-1].total) )*100) + '%';
      }
    })
  }

  onValueChangeTableAsBuiltDrawingStatus(row) {
    const tempDatasource = this.params.tableAsBuiltDrawingStatus.responsePayload.data;
    tempDatasource.forEach((tempRow, index) => {
      if (row.index == index) {
        tempRow[row.item.key] = Number(row.item.value);
        tempRow['total'] = ((tempRow) => {
          let tempTotal = 0;
          for (const [key, value] of Object.entries(tempRow)) {
            if (['st','ar', 'me','el','gn', 'la'].includes(key)) {
              tempTotal += Number(value);
            }
          }
          return tempTotal;
        })(tempRow);
        tempDatasource[tempDatasource.length - 1].total = ((tempDatasource) => {
          let tot = 0;
          for (const r of tempDatasource.filter(x=>!isEmptyValue(x.code))) {
            tot += Number(r.total);
          }
          return tot;
        })(tempDatasource);
        tempRow['pourcentage'] = Math.floor((Number(tempRow['total']) / Number(tempDatasource[tempDatasource.length-1].total) )*100) + '%';
      }
    })
  }

  onValueChangeTableHseReport(row) {
    const tempDatasource = this.params.tableHseReport.responsePayload.data;
    tempDatasource.forEach((tempRow, index) => {
      if (row.index == index) {
        tempRow[row.item.key] = Number(row.item.value);
        tempRow['total'] = ((tempRow) => {
          let tempTotal = 0;
          for (const [key, value] of Object.entries(tempRow)) {
            if (['contractorthisweek', 'subcontractorthisweek'].includes(key)) {
              tempTotal += Number(value);
            }
          }
          return tempTotal;
        })(tempRow);
        // tempDatasource[tempDatasource.length - 1].total = ((tempDatasource) => {
        //   let tot = 0;
        //   for (const r of tempDatasource.filter(x=>!isEmptyValue(x.code))) {
        //     tot += Number(r.total);
        //   }
        //   return tot;
        // })(tempDatasource);
        // tempRow['pourcentage'] = Math.floor((Number(tempRow['total']) / Number(tempDatasource[tempDatasource.length-1].total) )*100) + '%';
      }
    })
  }

  /** other functions */

  onCsvUpload(type) {
    this.params['eventType'] = type;
    let element: HTMLElement = document.querySelector('.upload-csv-file') as HTMLElement;
    element.click();
  }

  onFileSelected(event, fileType: string) {
    const file: File = event.target.files[0];
    if (file) {
      const fileTypeRegEx = new RegExp(fileType);
      if (!fileTypeRegEx.test(file.type)) {
        this.toast.error('gp.ap.tableListExecutiveReports.errors.only_csv_are_accepted');
        return;
      }
      this.params['uploadLoading'] = true;
      const request: RequestObject = <RequestObject>{
        uri: PROJET_URI.UPLOAD_CSV,
        params: {
          formData: {
            filedata: [file]
          },
          query: {
            idProject: 10
          }
        },
        microservice: ConstanteWs._CODE_ADMINISTRATION,
        method: ConstanteWs._CODE_POST,
        speCase: REQUEST_SPE_CASE.UPLOAD

      };
      this.sharedService.commonWs(request).subscribe({
        next: (response: ResponseObject) => {
          if (response['type'] === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * response['loaded'] / response['total']);
          } else if (response instanceof HttpResponse) {
            const result = JSON.parse(response.body.toString());
            if (result.code == ConstanteWs._CODE_WS_SUCCESS) {
              this.params['uploadLoading'] = false;
              this.params[this.params.eventType].responsePayload = {
                data: result.payload,
                total: result.payload.length
              };
            } else {
              this.params['uploadLoading'] = false;
              console.error(`Error in DashboardDetailsComponent/onUpload, error code :: ${result.code}`);
              this.toast.error();
            }
          }
        },
        error: (error) => {
          this.params['uploadLoading'] = false;
          console.error(`Error in DashboardDetailsComponent/onSave, error :: ${error}`);
          this.toast.error();
        }
      });
    }
  }

  onSaveData(tableCode: string, chartCode: string, datalist: any[]) {
    this.confirmDialogService.confirm().subscribe((flag) => {
      if (flag) {
        this.params['saveLoading'] = true;
        if (['tableContractorPaymentStatus', 'tableConsultantPaymentStatus', 'tableVariationOrders', 'tableClaims'].includes(tableCode)) {
          datalist.forEach(item => (item['code'] = tableCode));
        }
        const request: RequestObject = <RequestObject>{
          uri: CHART[tableCode].BASE,
          params: {
            body: datalist,
            query: {
              idProject: this.params['pathParams'].idProjet
            }
          },
          microservice: ConstanteWs._CODE_ADMINISTRATION,
          method: ConstanteWs._CODE_POST
        };
        this.sharedService.commonWs(request).subscribe({
          next: (response: ResponseObject) => {
            if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
              this.params['saveLoading'] = false;
              this.updateDataCharts(tableCode, chartCode);
              this.toast.success('general.success_save');
            } else {
              this.params['saveLoading'] = false;
              console.error(`Error in DashboardDetailsComponent/onSave, error code :: ${response.code}`);
              this.toast.error();
            }
          },
          error: (error) => {
            this.params['saveLoading'] = false;
            console.error(`Error in DashboardDetailsComponent/onSave, error :: ${error}`);
            this.toast.error();
          }
        });
      }
    });
  }


}
