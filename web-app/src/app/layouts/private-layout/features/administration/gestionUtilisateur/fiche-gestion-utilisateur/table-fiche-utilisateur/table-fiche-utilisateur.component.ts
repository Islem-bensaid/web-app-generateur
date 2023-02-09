import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {
  GestionProfilsMetadata
} from "@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata";
import { AppTranslateService, ConfirmDialogService, ToastService } from '@shared/services';
import {Router} from "@angular/router";
import {doFilter, initDatatableDetails, isSomeInputsChanged} from "@shared/tools";
import {pagination, paginationOptions} from "@shared/constantes";
import {PaginatorComponent} from "@shared/widgets";
import {DocumentExporterService} from "@shared/services/sharedWs/document-exporter.service";
import { RequestObject } from '@shared/models';
import { ADMINISTRATION_URI } from '@privateLayout/shared/constantes';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { SharedService } from '@shared/services/sharedWs/shared.service';

@Component({
  selector: 'app-table-fiche-utilisateur',
  templateUrl: './table-fiche-utilisateur.component.html',
  styleUrls: ['./table-fiche-utilisateur.component.css']
})
export class TableFicheUtilisateurComponent implements OnInit {
  @Input() responsePayload: any;
  @Output() sort = new EventEmitter<any>();
  @Output() paginate = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Input() checker: boolean = false;
  @Output() checkedData = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();
  tableGestionProfils = GestionProfilsMetadata.tableGestionUtilisateur;
  tableGestionProfilsDetails: { displayedColumns: string[], labels: object, specificColumns: object, exportedColumns: object };
  totalCount = 0;
  @ViewChild('p') paginatorComponent: PaginatorComponent;


  constructor(
      private appTranslateService: AppTranslateService,
      private router :Router,
      private documentExporterService: DocumentExporterService

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

    this.router.navigate(['/app/adm/gu/d/' +type.idAdmUser]);
  }

  editUtilisateur(type) {
    this.router.navigate(['/app/adm/gu/edit/' +type.idAdmUser]);
  }

  onAdd() {
    this.router.navigate(['/app/adm/gu/add']);
  }

  deleteUser(type) {
    this.delete.emit(type);

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
        this.documentExporterService.generatePdf('adm.gu.content.tableGu.title', this.dataSource.data, this.tableGestionProfilsDetails.exportedColumns, "landscape")
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
