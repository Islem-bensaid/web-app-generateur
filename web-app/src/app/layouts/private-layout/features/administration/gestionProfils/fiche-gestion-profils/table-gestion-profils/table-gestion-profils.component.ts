import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {
    GestionProfilsMetadata
} from '@privateLayout/shared/constantes/administration/gestion-profils/gestion-profils-metadata';
import {AppTranslateService} from '@shared/services';
import {doFilter, initDatatableDetails, isSomeInputsChanged} from '@shared/tools';
import {Router} from "@angular/router";
import {PaginatorComponent} from "@shared/widgets";
import {pagination, paginationOptions} from "@shared/constantes";
import {DocumentExporterService} from "@shared/services/sharedWs/document-exporter.service";

@Component({
    selector: 'app-table-gestion-profils',
    templateUrl: './table-gestion-profils.component.html',
    styleUrls: ['./table-gestion-profils.component.css']
})
export class TableGestionProfilsComponent implements OnInit, OnChanges {

    @Input() responsePayload: any;
    @Output() sort = new EventEmitter<any>();
    @Output() paginate = new EventEmitter<any>();
    @Input() checker: boolean = false;
    @Output() checkedData = new EventEmitter<any>();
    @Input() hasAdd: boolean=true;
    @Input()isDisable:boolean=false
    @ViewChild('p') paginatorComponent: PaginatorComponent;

    dataSource = new MatTableDataSource<any>();
    totalCount = 0;
    tableGestionProfils: any = GestionProfilsMetadata.tableGestionProfils;
    tableGestionProfilsDetails: { displayedColumns: string[], labels: object, specificColumns: object, exportedColumns: object };

    constructor(
        private appTranslateService: AppTranslateService,
        private router: Router,
        private documentExporterService: DocumentExporterService,
    ) {
    }

    ngOnInit(): void {
        if (this.checker) {
            this.tableGestionProfils = GestionProfilsMetadata.tableGestionProfil;
        }
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

    private loadDataSource(responsePayload) {
        this.dataSource.data = responsePayload.data || [];
        this.totalCount = responsePayload.data?.length || 0;
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

    onPaginateChange($event: any) {
        this.paginate.emit($event);
    }

    checkIfSpecificColumn(column, table) {
        return this.tableGestionProfilsDetails.specificColumns[table].includes(column);
    }


    openDetails(type) {
        this.router.navigate(['/app/adm/gp/d/' + type.id]);
    }

    editProfil(type) {
        this.router.navigate(['/app/adm/gp/edit/' + type.id]);
    }

    deleteProfil(type) {

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
                this.documentExporterService.generatePdf('adm.gp.content.tableGp.title', this.dataSource.data, this.tableGestionProfilsDetails.exportedColumns, "landscape")
                return;
            case "excel":
                console.info('Generating excel is already in construction. Have a good day. Sofiene 😊')
                return;
        }
    }

    setDataChecked(event, data) {
        this.checkedData.emit({event: event, data: data})
    }

    onAdd() {
        this.router.navigate(['/app/adm/gp/add']);
    }
}
