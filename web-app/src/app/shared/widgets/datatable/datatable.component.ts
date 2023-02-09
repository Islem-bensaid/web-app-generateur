import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PaginatorComponent } from '@shared/widgets';
import { MatTableDataSource } from '@angular/material/table';
import { AppTranslateService } from '@shared/services';
import { DocumentExporterService } from '@shared/services/sharedWs/document-exporter.service';
import { doFilterV2, initExportedColumns, isEmptyValue, isInputChanged } from '@shared/tools';
import { pagination, paginationOptions } from '@shared/constantes';
import { FormBuilder, FormControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { COMMON_TYPES_CODES } from '@privateLayout/shared/constantes/common/Constantes';
import { BTN_TYPES } from '@shared/constantes/Constante';

@Component({
  selector: 'st2i-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  isEmptyValue = isEmptyValue;
  COMMON_TYPES_CODES = COMMON_TYPES_CODES;
  BTN_TYPES = BTN_TYPES;

  @ViewChild('p') paginatorComponent: PaginatorComponent;

  @Input() responsePayload: { data: any[], total: number, isLoading: boolean } = {
    data: [],
    total: 0,
    isLoading: false
  };
  @Input() metadata: any;
  @Output() onAction = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();
  params: any = {};
  form: UntypedFormGroup = new UntypedFormGroup({});

  // totalCount = 0;


  constructor(
    private appTranslateService: AppTranslateService,
    private documentExporterService: DocumentExporterService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    if (isEmptyValue(this.params['pagination'])) {
      this.params['pagination'] = {};
    }
    this.params['pagination']['pageSize'] = pagination().itemsPerPage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isInputChanged(changes, 'responsePayload')) {
      if (changes.responsePayload) {
        if (changes.responsePayload.currentValue !== changes.responsePayload.previousValue) {
          this.loadDataSource(changes.responsePayload.currentValue);
        }
      }
    }
    if (isInputChanged(changes, 'metadata')) {
      if (changes.metadata) {
        if (changes.metadata.currentValue !== changes.metadata.previousValue) {
          this.metadata = changes.metadata.currentValue;
        }
      }
    }
  }

  private loadDataSource(responsePayload) {
    // this.dataSource.data = responsePayload?.data || [];
    if (this.metadata?.editable === true && !isEmptyValue(responsePayload?.data) && responsePayload?.data.length) {
      this.dataSource.data = responsePayload.data;
      this.form = this.initForm();
    } else {
      this.dataSource.data = responsePayload?.data || [];
    }


    if (isEmptyValue(this.params['pagination'])) {
      this.params['pagination'] = {};
    }
    this.params['pagination']['totalCount'] = responsePayload?.total || 0;
  }

  initForm() {
    const columnsToDisplay = Object.values(this.metadata.columns)
      .filter(e => [COMMON_TYPES_CODES.TEXT_FIELD_INPUT, COMMON_TYPES_CODES.SELECT_DATE_INPUT, COMMON_TYPES_CODES.SELECT_LIST_INPUT].includes(e['type']));

    const tForm = this.fb.group({ datasource: this.fb.array([]) });
    this.dataSource.data.forEach((row: any, index) => {
      (<UntypedFormArray>tForm.get('datasource')).insert(index, this.fb.group({}));
      for (const column of columnsToDisplay) {
        // @ts-ignore
        (<UntypedFormGroup>(<UntypedFormArray>tForm.get('datasource')).at(index)).addControl(this.getColumnKey(column['key']), new FormControl({
          value: row[this.getColumnKey(column['key'])],
          // @ts-ignore
          disabled: (column?.metadata?.disabled || false)
          // @ts-ignore
        }, (column?.metadata?.validators || [])));
      }
    });
    return tForm;
  }

  get _formDatasource() {
    return this.form.get('datasource') as UntypedFormArray;
  }

  getFormControl(index: number, key: string) {
    return this._formDatasource.at(index).get(key) as UntypedFormControl;
  }

  onControlValueChange(value: any, index: number, controlKey: string, metadata?, typeControl?) {
    // const tempDatasource = this.dataSource.data;
    console.log('metadata', metadata);
    this.dataSource.data.forEach((tempRow, i) => {
      if (index == i) {
        tempRow[controlKey] = ((tvalue, tmetadata) => {
          if (typeControl == COMMON_TYPES_CODES.SELECT_LIST_INPUT) {
            return tvalue[tmetadata.value];
          }
          return value;
        })(value, metadata);
      }
    });
    this.onActionEventEmitter('onValueChange', {
      key: controlKey,
      value: value
    }, index);
  }

  onSortChange($event: any) {
    this.onActionEventEmitter('onSort', {
      nameCol: $event.active,
      direction: ($event.direction.toUpperCase() || 'ASC') + ' nulls last'
    });
  }

  onPaginateChange(pagination) {
    this.params['pagination']['pageSize'] = pagination.limit;
    this.onActionEventEmitter('onPaginate', pagination);
  }

  onCheckChange(row, checked, index) {
    row['checked'] = checked;
    this.onActionEventEmitter('onCheckToggle', { row: row, checked: checked }, index);
  }

  onRadioChange(row, index) {
    // row['checked'] = true;
    this.onActionEventEmitter('onRadioChange', row, index);
  }


  onFilter(typedValue) {
    const filterDetails = doFilterV2(typedValue, this.metadata.columns, this.responsePayload.data, this.appTranslateService);
    this.dataSource.data = filterDetails?.data || this.responsePayload.data;
    this.params['pagination']['totalCount'] = filterDetails?.data?.length || this.responsePayload.total;
    this.paginatorComponent.pageSizeOptions = filterDetails?.data?.length ? [filterDetails.data.length] : paginationOptions();

    if (isEmptyValue(typedValue)) {
      this.paginatorComponent.pageSize = this.params['pagination']['pageSize'];
    } else {
      this.paginatorComponent.pageSize = filterDetails?.data?.length;
    }
  }

  generateFile(fileType: 'pdf' | 'excel') {
    switch (fileType) {
      case 'pdf':
        let exportedColumns = initExportedColumns(this.metadata.columns, this.appTranslateService);
        this.documentExporterService.generatePdf(this.metadata.title, this.dataSource.data, exportedColumns, this.metadata.exportOrientation);
        return;
      case 'excel':
        console.info('Generating excel is already in construction. Have a good day. Sofiene 😊');
        return;
    }
  }


  onActionEventEmitter(handler: string, item: any = null, index: number = null) {
    this.onAction.emit({ handler: handler + this.metadata.ref, row: { item: item, index: index } });
  }

  getColumnsToDisplay() {
    return Object.values(this.metadata.columns).map(e => this.getColumnKey(e['key'])) as Iterable<string>;
  }

  getColumnKey(column): string {
    if (typeof column == 'object') {
      return column[this.appTranslateService.getDefaultLang()];
    }
    return column;
  }

  cardMetadata(metadata) {
    return {
      title: metadata.title,
      forDatatable: true,
      classList: { cardContent: 'p-0' },
      hasAdd: metadata.hasAdd,
      hasExport: metadata.hasExport,
      hasFilter: metadata.hasFilter
    };
  }
}
