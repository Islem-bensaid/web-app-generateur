import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppTranslateService } from '../../services';
import { isSomeInputsChanged } from '../../tools';
import { FicheDetailsMetadata } from '@shared/models';

@Component({
  selector: 'st2i-fiche-details',
  templateUrl: './fiche-details.component.html',
  styleUrls: ['./fiche-details.component.css']
})
export class FicheDetailsComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ['label', 'value'];
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() data: any = {};
  @Input() metadata: FicheDetailsMetadata;



  constructor(
    private appTranslateService: AppTranslateService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isSomeInputsChanged(changes, ['data', 'metadata'])) {
      if (changes.data) {
        if (changes.data.currentValue !== changes.data.previousValue) {
          this.loadDataSource(changes.data.currentValue);
        }
      }
    }
  }

  private loadDataSource(data) {
    this.data = data;
    if (Object.keys(this.data).length) {
      const getKey = (c)=>{
        if (typeof c.key == 'string') {
          return c.key
        } else {
          return c.key[this.appTranslateService.getDefaultLang()]
        }
      }
      let transposedData = [];
      let i = 0;
      if (this.metadata?.columns) {
        for (const column of this.metadata.columns) {
          transposedData.push({
            label: column.label,
            value: data[getKey(column)],
            index: i++,
            colKey: getKey(column),
            type: ['montant', 'datetime', 'other'].includes(column.type)? column.type : 'typedValue',
          });
        }
      }
      this.dataSource.data = [...transposedData];
    }
  }
}
