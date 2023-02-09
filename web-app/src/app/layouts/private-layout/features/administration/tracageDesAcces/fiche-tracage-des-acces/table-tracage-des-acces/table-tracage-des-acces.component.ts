import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {
  GestionProfilsMetadata
} from "@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata";
import {PaginatorComponent} from "@shared/widgets";
import {AppTranslateService} from "@shared/services";
import {Router} from "@angular/router";
import {DocumentExporterService} from "@shared/services/sharedWs/document-exporter.service";
import {doFilter, initDatatableDetails, isSomeInputsChanged} from "@shared/tools";
import {pagination, paginationOptions} from "@shared/constantes";

@Component({
  selector: 'app-table-tracage-des-acces',
  templateUrl: './table-tracage-des-acces.component.html',
  styleUrls: ['./table-tracage-des-acces.component.css']
})
export class TableTracageDesAccesComponent implements OnInit {
  @Input() responsePayload: any;
  @Output() sort = new EventEmitter<any>();
  @Output() paginate = new EventEmitter<any>();
  @Input() checker: boolean = false;
  @Output() checkedData = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();
  tableGestionProfils = GestionProfilsMetadata.tableTracageAcces;
  tableGestionProfilsDetails: { displayedColumns: string[], labels: object, specificColumns: object, exportedColumns: object };
  totalCount = 0;
  @ViewChild('p') paginatorComponent: PaginatorComponent;


  constructor(
      private appTranslateService: AppTranslateService,
      private router :Router,
      private documentExporterService: DocumentExporterService,

  ) {
  }

  ngOnInit(): void {
    this.tableGestionProfilsDetails = this.initTableGestionProfilsDetails();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (isSomeInputsChanged(changes, ['responsePayload'])) {
      if (changes.responsePayload) {
        if (changes.responsePayload.currentValue !== changes.responsePayload.previousValue) {
          this.loadDataSource(changes.responsePayload.currentValue);
        }
      }
    }
  }

  loadDataSource(responsePayload) {
    this.dataSource.data = responsePayload.data || [];
    this.totalCount = responsePayload.total;
  }


  initTableGestionProfilsDetails() {
    return initDatatableDetails(this.tableGestionProfils.columns, this.appTranslateService);
  }

  onSortChange($event: any) {

    this.sort.emit({
      nameCol: $event.active,
      direction: ($event.direction.toUpperCase() || 'ASC') + ' nulls last'
    });
  }

  checkIfSpecificColumn(column, table) {
    return this.tableGestionProfilsDetails.specificColumns[table].includes(column);
  }




  openDetails(type) {

    this.router.navigate(['/app/adm/tda/d/' +type.idLogAccess]);
  }


  onAdd() {

  }

  onFilter(typedValue) {
    const filterDetails = doFilter(typedValue, this.tableGestionProfilsDetails, this.responsePayload.data);
    this.dataSource.data = filterDetails?.data || this.responsePayload.data;
    this.totalCount = filterDetails?.data?.length || this.responsePayload.total;
    this.paginatorComponent.pageSizeOptions = filterDetails?.data?.length ? [filterDetails.data.length] : paginationOptions();
    this.paginatorComponent.pageSize = filterDetails?.data?.length || pagination().itemsPerPage;
  }

  generateFile(fileType: 'pdf' | 'excel') {
    switch (fileType) {
      case "pdf":
        this.documentExporterService.generatePdf('adm.tda.table', this.dataSource.data, this.tableGestionProfilsDetails.exportedColumns, "landscape")
        return;
      case "excel":
        console.info('Generating excel is already in construction. Have a good day. Sofiene 😊')
        return;
    }
  }

  onPaginateChange($event: any) {
    this.paginate.emit($event);
  }
}
